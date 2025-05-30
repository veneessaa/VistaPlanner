import {
  collection,
  addDoc,
  query,
  doc,
  getDoc,
  getDocs,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { getSubtasksByTaskId } from "../subtask/subtask.repository";
import { updateStatus } from "../helper/task.helper";

export const createTask = async (taskData: CreateTaskDto) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), taskData);
    return { id: docRef.id, ...taskData };
  } catch (error) {
    throw new Error("Failed to create task: " + error);
  }
};

export const createUserInTask = async (userId: string, taskId: string) => {
  try {
    const docRef = await addDoc(collection(db, "usersInTasks"), {
      userId,
      taskId,
    });
  } catch (error) {
    throw new Error("Failed to create user in task: " + error);
  }
};

export const getTasksByUserId = async (userId: string) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("userId", "==", userId),
      orderBy("dueDate", "asc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return [];

    const now = new Date();

    const tasks = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const taskData = docSnap.data();
        const taskId = docSnap.id;
        const dueDate = new Date(taskData.dueDate);
        const status = taskData.status;
        const taskRef = doc(db, "tasks", taskId);

        // 🔴 Jika status task sudah "Done", skip semua logic
        if (status === "Done") {
          return { id: taskId, ...taskData };
        }

        // Ambil subtasks dari Firestore
        const subtasks = await getSubtasksByTaskId(taskId);
        let updatedStatus = updateStatus(subtasks, dueDate);

        // Jika ada perubahan status, update
        if (updatedStatus !== status) {
          await updateDoc(taskRef, { status: updatedStatus });
          return { id: taskId, ...taskData, status: updatedStatus };
        }

        return { id: taskId, ...taskData };
      })
    );

    return tasks;
  } catch (error: any) {
    console.error("Error retrieving tasks by userId:", error);
    throw new Error(error.message || "Failed to retrieve tasks");
  }
};

export const getCollabTask = async (
  userId: string
): Promise<(CreateTaskDto & { id: string })[]> => {
  try {
    // Step 1: Get all taskId where userId matches
    const userInTaskQuery = query(
      collection(db, "usersInTasks"),
      where("userId", "==", userId)
    );
    const userInTaskSnapshot = await getDocs(userInTaskQuery);

    if (userInTaskSnapshot.empty) return [];

    const now = new Date();

    // Step 2: Fetch task details and update status if overdue
    const taskPromises = userInTaskSnapshot.docs.map(async (docSnapshot) => {
      const { taskId } = docSnapshot.data();
      const taskRef = doc(db, "tasks", taskId);
      const taskSnap = await getDoc(taskRef);

      if (!taskSnap.exists()) return null;

      const taskData = taskSnap.data() as CreateTaskDto;
      const dueDate = new Date(taskData.dueDate);
      const status = taskData.status;

      // 🔴 Jika status task sudah "Done", skip semua logic
      if (status === "Done") {
        return { id: taskId, ...taskData };
      }

      // Ambil subtasks dari Firestore
      const subtasks = await getSubtasksByTaskId(taskId);
      let updatedStatus = updateStatus(subtasks, dueDate);

      // Jika ada perubahan status, update
      if (updatedStatus !== status) {
        await updateDoc(taskRef, { status: updatedStatus });
        return { id: taskId, ...taskData, status: updatedStatus };
      }

      return { id: taskId, ...taskData };
    });

    const tasks = await Promise.all(taskPromises);

    // Step 3: Filter out nulls and sort by dueDate ascending
    return tasks
      .filter((task) => task !== null)
      .sort(
        (a, b) =>
          new Date(a!.dueDate).getTime() - new Date(b!.dueDate).getTime()
      ) as (CreateTaskDto & { id: string })[];
  } catch (error) {
    throw new Error("Failed to fetch tasks: " + error);
  }
};

export const getAllUserTasks = async (
  userId: string
): Promise<(CreateTaskDto & { id: string })[]> => {
  try {
    // Panggil kedua fungsi secara paralel
    const [ownedTasks, collabTasks] = await Promise.all([
      getTasksByUserId(userId),
      getCollabTask(userId),
    ]);

    // Gabungkan dua array task dan hilangkan duplikat (berdasarkan id)
    const taskMap = new Map<string, CreateTaskDto & { id: string }>();

    for (const task of [...ownedTasks, ...collabTasks]) {
      taskMap.set(task.id, task as any);
    }

    const allTasks = Array.from(taskMap.values());

    allTasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    return allTasks;
  } catch (error) {
    console.error("Failed to get all tasks:", error);
    throw new Error("Failed to get all tasks");
  }
};

export const getUsersByTaskId = async (taskId: string) => {
  try {
    const usersInTaskQuery = query(
      collection(db, "usersInTasks"),
      where("taskId", "==", taskId)
    );
    const usersInTaskSnapshot = await getDocs(usersInTaskQuery);

    if (usersInTaskSnapshot.empty) return [];

    const userPromises = usersInTaskSnapshot.docs.map(async (docSnapshot) => {
      const { userId } = docSnapshot.data();
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null;
    });

    const users = await Promise.all(userPromises);
    return users.filter((user) => user !== null);
  } catch (error) {
    console.error("Error retrieving users by taskId:", error);
    throw new Error("Failed to fetch users: " + error);
  }
};

export const updateTask = async (
  taskId: string,
  updatedData: UpdateTaskDto
) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
    return { id: taskId, ...updatedData };
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error("Failed to update task: " + error);
  }
};

export const getTaskById = async (
  taskId: string
): Promise<CreateTaskDto & { id: string }> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data() as CreateTaskDto;

    return { id: taskSnap.id, ...taskData };
  } catch (error) {
    console.error("Failed to get task by ID:", error);
    throw new Error("Failed to retrieve task: " + error);
  }
};

export const deleteTaskWithCollabs = async (taskId: string) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);

    const collabQuery = query(
      collection(db, "usersInTasks"),
      where("taskId", "==", taskId)
    );
    const collabSnapshot = await getDocs(collabQuery);

    const deletePromises = collabSnapshot.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deletePromises);

    return { message: "Task and collaborators deleted", taskId };
  } catch (error) {
    console.error("Error deleting task and collaborators:", error);
    throw new Error("Failed to delete task and its collaborators");
  }
};

export const deleteUserInTask = async (
  taskId: string,
  userIds: string[] // Accepts one or more userIds
) => {
  try {
    const deletePromises = userIds.map(async (userId) => {
      const q = query(
        collection(db, "usersInTasks"),
        where("taskId", "==", taskId),
        where("userId", "==", userId)
      );

      const snapshot = await getDocs(q);

      const docDeletes = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      return Promise.all(docDeletes);
    });

    await Promise.all(deletePromises);

    return {
      message: `Deleted user(s) [${userIds.join(", ")}] from task ${taskId}`,
    };
  } catch (error) {
    console.error("Failed to delete user(s) in task:", error);
    throw new Error("Failed to delete user(s) in task: " + error);
  }
};

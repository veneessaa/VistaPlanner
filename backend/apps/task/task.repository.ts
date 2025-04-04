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
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";

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
    const tasksRef = collection(db, "tasks"); // Referensi ke koleksi "tasks"
    const q = query(tasksRef, where("userId", "==", userId)); // Query berdasarkan userId
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return []; // Jika tidak ada task, kembalikan array kosong
    }

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return tasks; // Mengembalikan daftar tugas
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

    // Step 2: Fetch task details using taskIds
    const taskPromises = userInTaskSnapshot.docs.map(async (docSnapshot) => {
      const { taskId } = docSnapshot.data();
      const taskRef = doc(db, "tasks", taskId);
      const taskSnap = await getDoc(taskRef);

      if (taskSnap.exists()) {
        // Extract task data and include id
        const taskData = taskSnap.data() as CreateTaskDto;
        return { id: taskSnap.id, ...taskData };
      } else {
        return null;
      }
    });

    // Step 3: Resolve all task promises and filter out null results
    const tasks = await Promise.all(taskPromises);
    return tasks.filter((task) => task !== null) as (CreateTaskDto & {
      id: string;
    })[];
  } catch (error) {
    throw new Error("Failed to fetch tasks: " + error);
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

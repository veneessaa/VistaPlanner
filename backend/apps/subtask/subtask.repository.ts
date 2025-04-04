import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { CreateSubtaskDTO } from "./dto/createSubtask.dto";
import { UpdateSubtaskDTO, updateSubtaskSchema } from "./dto/updateSubtask.dto";

export const createSubtask = async (subtaskData: CreateSubtaskDTO) => {
  try {
    const docRef = await addDoc(collection(db, "subtasks"), subtaskData);
    return { id: docRef.id, ...subtaskData };
  } catch (error: any) {
    console.error("Failed to create subtask:", error);
    throw new Error("Failed to create subtask: " + error.message);
  }
};

export const getSubtasksByTaskId = async (taskId: string) => {
  try {
    const subtaskRef = collection(db, "subtasks");
    const q = query(subtaskRef, where("taskId", "==", taskId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const subtasks = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        let user = null;

        // Join with user if userId exists
        if (data.userId) {
          const userDoc = await getDoc(doc(db, "users", data.userId));
          if (userDoc.exists()) {
            user = { id: userDoc.id, ...userDoc.data() };
          }
        }

        return {
          id: docSnap.id,
          ...data,
          user,
        };
      })
    );

    return subtasks;
  } catch (error: any) {
    console.error("Failed to get subtask:", error);
    throw new Error("Failed to get subtask: " + error.message);
  }
};

export const updateSubtask = async (
  subtaskId: string,
  updatedData: UpdateSubtaskDTO
) => {
  try {
    const subtaskDocRef = doc(db, "subtasks", subtaskId);
    await updateDoc(subtaskDocRef, updatedData);
    return {
      id: subtaskId,
      ...updatedData,
    };
  } catch (error: any) {
    console.error("Failed to update subtask:", error);
    throw new Error("Failed to update subtask: " + error.message);
  }
};

export const deleteSubtask = async (subtaskId: string) => {
  try {
    const subtaskRef = doc(db, "subtasks", subtaskId);
    await deleteDoc(subtaskRef);

    return { message: "Task and collaborators deleted", subtaskId };
  } catch (error: any) {
    console.error("Error deleting task and collaborators:", error);
    throw new Error(
      "Failed to delete task and its collaborators: " + error.message
    );
  }
};

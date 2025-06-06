import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { SignupDto } from "../auth/dto/signup.dto";
import { db } from "../../firebase/config";
import bcrypt from "bcrypt";
import { SigninDto } from "../auth/dto/signin.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

export const createUser = async (userData: SignupDto) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("User successfully created with ID:", docRef.id);
    const newUser = { id: docRef.id, ...userData };
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error: any) {
    console.error("Error retrieving user by email:", error);
    throw new Error(error.message || "Failed to retrieve user");
  }
};

export const getUserByEmailAndPassword = async (user: SigninDto) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(user.password, userData.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    return { id: userDoc.id, ...userData };
  } catch (error: any) {
    console.error("Error retrieving user:", error);
    throw new Error(error.message || "Failed to retrieve user");
  }
};

export const updateUser = async (userId: string, updateData: UpdateUserDto) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnap.data();

    if (!updateData.password) {
      delete updateData.password;
    } else {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }

    // Update Firestore
    await updateDoc(userRef, updateData);

    return { id: userId, ...userData, ...updateData };
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Failed to update user");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    return { id: userId, ...userSnap.data() };
  } catch (error: any) {
    console.error("Error retrieving user by ID:", error);
    throw new Error(error.message || "Failed to retrieve user");
  }
};

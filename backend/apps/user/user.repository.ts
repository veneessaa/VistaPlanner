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
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const fullUserData = {
      ...userData,
      lastActivity: yesterday,
      currentStreak: 0,
    };

    const docRef = await addDoc(collection(db, "users"), fullUserData);

    return {
      id: docRef.id,
      ...fullUserData,
    };
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

export const incrementStreak = async (user: any) => {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

  const userRef = doc(db, "users", user.id);

  if (user.lastActivity == undefined) {
    await updateDoc(userRef, {
      currentStreak: 1,
      lastActivity: today,
    });
    return;
  }

  const lastActivityStr =
    user.lastActivity?.toDate?.().toISOString().slice(0, 10) ||
    new Date(user.lastActivity).toISOString().slice(0, 10);

  if (lastActivityStr === todayStr) {
    return;
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let newStreak = 1;

  if (lastActivityStr === yesterdayStr) {
    newStreak = (user.currentStreak || 0) + 1;
  }

  await updateDoc(userRef, {
    currentStreak: newStreak,
    lastActivity: today,
  });
};

export const resetStreakIfInactive = async (user: any) => {
  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  const lastActivityDate =
    user.lastActivity?.toDate?.() || new Date(user.lastActivity);

  const isTwoDaysAgo =
    lastActivityDate.toISOString().slice(0, 10) ===
    twoDaysAgo.toISOString().slice(0, 10);

  if (isTwoDaysAgo) {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      currentStreak: 0,
    });
    console.log(`Streak reset for user ${user.id}`);
  }
};

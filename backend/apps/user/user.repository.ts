import { addDoc, collection } from "firebase/firestore";
import { SignupDto } from "../auth/dto/signup.dto";
import { db } from "../../firebase/config";

export async function createUser(userData: SignupDto) {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("User successfully created with ID:", docRef.id);
        const newUser = { id: docRef.id, ...userData };
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}
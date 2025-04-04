import express from "express";
import { signupSchema } from "./dto/signup.dto";
import { createUser, getUserByEmail, getUserByEmailAndPassword } from "../user/user.repository";
import bcrypt from "bcrypt"
import { signinSchema } from "./dto/signin.dto";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const user = await getUserByEmail(validatedData.email);
        if (user){
            res.status(400).json({ message: "Email already taken!" });
            return
        }
        const passwordHash = await bcrypt.hash(validatedData.password, 10)
        const newUser = await createUser({ ...validatedData, password: passwordHash });

        res.status(201).json({
            message: "Register successfully",
            user: newUser
        });
    } catch (error: any) {
        console.error("Error during signup:", error);

        if (error.name === "ZodError") {
            res.status(400).json({ message: "Invalid input!", errors: error.errors });
        }

        res.status(500).json({ message: "Failed to create user" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const validatedData = signinSchema.parse(req.body);
        const user = await getUserByEmailAndPassword(validatedData);

        res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error: any) {
        res.status(401).json({ message: error.message || "Invalid credentials" });
    }
});

export default router;

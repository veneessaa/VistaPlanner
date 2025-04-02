import express from "express";
import { signupSchema } from "./dto/signup.dto";
import { createUser } from "../user/user.repository";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const newUser = await createUser(validatedData);

        res.status(201).json({
            message: "Register successfully",
            user: newUser
        });
    } catch (error: any) {
        console.error("Error during signup:", error);

        if (error.name === "ZodError") {
            res.status(400).json({ message: "Invalid input", errors: error.errors });
        }

        res.status(500).json({ message: "Failed to create user" });
    }
});

export default router;

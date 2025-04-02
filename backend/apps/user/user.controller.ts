import express from "express";
import { updateUser } from "../user/user.repository";
import { updateUserSchema } from "./dto/updateUser.dto";

const router = express.Router();

router.put("/:id", async (req, res) => {
    try {
        const validatedData = updateUserSchema.parse(req.body);
        const userId = req.params.id;
        const updatedUser = await updateUser(userId, validatedData);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;

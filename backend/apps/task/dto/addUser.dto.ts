import { z } from "zod";

export const addUserSchema = z.object({
  email: z.string().email(),
  taskId: z.string().min(1, "Task id is required")
});

export type AddUserDTO = z.infer<typeof addUserSchema>;
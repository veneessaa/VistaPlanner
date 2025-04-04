import { z } from "zod";

export const createSubtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["Not Started", "In Progress", "Done"]),
  userId: z.string().optional(),
  taskId: z.string().min(1, "Task ID is required"),
});

export type CreateSubtaskDTO = z.infer<typeof createSubtaskSchema>;
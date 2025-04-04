import { z } from "zod";

export const updateSubtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["Not Started", "In Progress", "Done"]),
  userId: z.string().optional(),
  taskId: z.string().min(1, "Task ID is required"),
});

export type UpdateSubtaskDTO = z.infer<typeof updateSubtaskSchema>;
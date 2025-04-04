import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["Assignment", "Class Schedule", "Meeting", "Project", "Exam/Quiz", "Others"]),
  priority: z.enum(["High", "Medium", "Low"]),
  dueDate: z.string(),
  status: z.enum(["Not Started", "In Progress", "Done"]),
  userId: z.string()
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
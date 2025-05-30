import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum([
    "Assignment",
    "Presentation",
    "Meeting",
    "Project",
    "Exam/Quiz",
    "Others",
  ]),
  priority: z.enum(["High", "Medium", "Low"]),
  dueDate: z.string(),
  status: z.enum(["Not Started", "In Progress", "Done", "Late"]),
  userId: z.string().min(1, "User ID is required"),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.string().optional(),
  bio: z.string().optional(),
  birthDate: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  phoneNumber: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
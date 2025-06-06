import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),

  gender: z
    .string()
    .optional()
    .refine((val) => !val || val === "Male" || val === "Female", {
      message: "Gender must be either 'Male' or 'Female'",
    }),

  bio: z.string().optional(),

  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const inputDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // agar hanya membandingkan tanggal, bukan waktu
        return inputDate <= today;
      },
      {
        message: "Birth date cannot be in the future",
      }
    ),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters",
    }),

  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{11,}$/.test(val), {
      message:
        "Phone number must be at least 11 digits and contain only numbers",
    }),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

import { z } from "zod";

export const signupSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .regex(/^(?!\s*$)(?=.*[a-zA-Z])[a-zA-Z\s]{2,}$/, "Name must contain at least 2 letters and cannot be only spaces")
        .transform((val) => val.trimStart()),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupDto = z.infer<typeof signupSchema>;
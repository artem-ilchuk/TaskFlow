import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email").min(3, "Email is too short"),
  password: z.string().min(6, "Password must  be at least 6 characters"),
  accept: z
    .boolean()
    .refine((val) => val === true, "You must accept the Policy"),
});

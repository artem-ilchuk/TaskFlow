import { z } from "zod";

const titleRule = z
  .string()
  .min(3, "Title must be at least 3 characters")
  .max(100, "Title is too long");

const descriptionRule = z
  .string()
  .max(500, "Description is too long")
  .optional()
  .or(z.literal(""));

export const projectSchema = z.object({
  title: titleRule,
  description: descriptionRule.refine((val) => val && val.length > 0, {
    message: "Description is required for projects",
  }),
});

export const updateProjectSchema = projectSchema.partial();

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.union([z.date(), z.string()]).nullable().optional(),
  priority: z.enum(["low", "medium", "high"]),
  assignedTo: z.string().nullable().optional(),
});
export const updateTaskSchema = taskSchema.partial();

export type ProjectFormData = z.infer<typeof projectSchema>;
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

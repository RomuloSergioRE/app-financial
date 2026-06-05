import { z } from "zod/v4";

export const categorySchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  color: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  userId: z.union([z.string(), z.number()]).nullable().optional().transform((v) => v !== null && v !== undefined ? String(v) : v),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CategoryDTO = z.infer<typeof categorySchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;

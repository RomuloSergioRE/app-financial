import { z } from "zod/v4";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
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

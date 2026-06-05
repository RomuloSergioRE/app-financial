import { z } from "zod/v4";

export const tagSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  color: z.string().nullable().optional(),
  userId: z.union([z.string(), z.number()]).nullable().optional().transform((v) => v !== null && v !== undefined ? String(v) : v),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TagDTO = z.infer<typeof tagSchema>;

export const createTagSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  color: z.string().optional(),
});

export type CreateTagDTO = z.infer<typeof createTagSchema>;

export const updateTagSchema = createTagSchema.partial();

export type UpdateTagDTO = z.infer<typeof updateTagSchema>;

import { z } from "zod/v4";

export const goalSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  categoryId: z.union([z.string(), z.number()]).nullable().optional().transform((v) => v !== null && v !== undefined ? String(v) : v),
  name: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  deadline: z.string().nullable().optional(),
  categoryName: z.string().optional(),
  progress: z.number().optional(),
  achieved: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GoalDTO = z.infer<typeof goalSchema>;

export const createGoalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  targetAmount: z.number().positive("Valor alvo deve ser positivo"),
  categoryId: z.string().optional(),
  deadline: z.string().optional(),
});

export type CreateGoalDTO = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = createGoalSchema.partial();

export type UpdateGoalDTO = z.infer<typeof updateGoalSchema>;

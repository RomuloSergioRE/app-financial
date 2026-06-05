import { z } from "zod/v4";

export const budgetSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  categoryId: z.union([z.string(), z.number()]).transform(String),
  month: z.number(),
  year: z.number(),
  limit: z.number(),
  spent: z.number(),
  categoryName: z.string().optional(),
  overBudget: z.boolean().optional(),
  percentage: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BudgetDTO = z.infer<typeof budgetSchema>;

export const createBudgetSchema = z.object({
  categoryId: z.string({ message: "Categoria é obrigatória" }),
  month: z.number().int().min(1, "Mês inválido").max(12, "Mês inválido"),
  year: z.number().int().min(2000, "Ano inválido").max(2100, "Ano inválido"),
  limit: z.number().positive("Limite deve ser positivo"),
});

export type CreateBudgetDTO = z.infer<typeof createBudgetSchema>;

export const updateBudgetSchema = createBudgetSchema.partial();

export type UpdateBudgetDTO = z.infer<typeof updateBudgetSchema>;

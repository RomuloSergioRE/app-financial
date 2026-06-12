import { z } from "zod/v4";

export const recurringSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  categoryId: z.union([z.string(), z.number()]).transform(String),
  description: z.string(),
  amount: z.number(),
  type: z.enum(["income", "outcome"]),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  interval: z.number(),
  nextDate: z.string(),
  endDate: z.string().nullable().optional(),
  active: z.boolean(),
  categoryName: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RecurringDTO = z.infer<typeof recurringSchema>;

export const createRecurringSchema = z.object({
  categoryId: z.string({ message: "Categoria é obrigatória" }),
  description: z.string().min(1, "Descrição é obrigatória").trim(),
  amount: z.number().positive("Valor deve ser positivo").int(),
  type: z.enum(["income", "outcome"]),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  interval: z.number().int().positive(),
  nextDate: z.string({ message: "Próxima data é obrigatória" }),
  endDate: z.string().optional(),
});

export type CreateRecurringDTO = z.infer<typeof createRecurringSchema>;

export const updateRecurringSchema = createRecurringSchema.partial().extend({
  active: z.boolean().optional(),
});

export type UpdateRecurringDTO = z.infer<typeof updateRecurringSchema>;

export const executeRecurringResponseSchema = z.object({
  transactionId: z.string(),
  nextDate: z.string(),
});

export type ExecuteRecurringResponseDTO = z.infer<typeof executeRecurringResponseSchema>;

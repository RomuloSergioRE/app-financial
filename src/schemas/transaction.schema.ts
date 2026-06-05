import { z } from "zod/v4";

const tagOnTransactionSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  color: z.string().nullable().optional(),
});

export const transactionSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  description: z.string(),
  amount: z.number(),
  type: z.enum(["income", "outcome"]),
  date: z.string(),
  categoryId: z.union([z.string(), z.number()]).transform(String),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
      color: z.string().optional(),
      icon: z.string().optional(),
    })
    .nullish(),
  tags: z.array(tagOnTransactionSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TransactionDTO = z.infer<typeof transactionSchema>;

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória").trim(),
  amount: z.number().positive("Valor deve ser positivo"),
  type: z.enum(["income", "outcome"]),
  date: z.string(),
  categoryId: z.string({ message: "Categoria é obrigatória" }),
});

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = createTransactionSchema.partial();

export type UpdateTransactionDTO = z.infer<typeof updateTransactionSchema>;

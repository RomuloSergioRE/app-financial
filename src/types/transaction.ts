import type { z } from "zod/v4";
import type { transactionSchema, createTransactionSchema } from "@/schemas/transaction.schema";

export type Transaction = z.infer<typeof transactionSchema>;
export type CreateTransactionRequest = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionRequest = Partial<CreateTransactionRequest>;

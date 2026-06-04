import { z } from "zod/v4";

export const balanceResponseSchema = z.object({
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netBalance: z.number(),
});

export type BalanceResponseDTO = z.infer<typeof balanceResponseSchema>;

export const categoryDistributionSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  color: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  totalAmount: z.number(),
  percentage: z.number(),
  transactionCount: z.number().optional(),
});

export type CategoryDistributionDTO = z.infer<typeof categoryDistributionSchema>;

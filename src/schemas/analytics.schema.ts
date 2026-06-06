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

export const monthlySeriesSchema = z.object({
  month: z.string(),
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netBalance: z.number(),
});

export type MonthlySeriesDTO = z.infer<typeof monthlySeriesSchema>;

export const periodTotalsSchema = z.object({
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netBalance: z.number(),
});

export const comparisonSchema = z.object({
  current: periodTotalsSchema,
  previous: periodTotalsSchema,
  changes: z.object({
    incomeChange: z.number().nullable(),
    outcomeChange: z.number().nullable(),
    netChange: z.number().nullable(),
  }),
});

export type ComparisonDTO = z.infer<typeof comparisonSchema>;

export const topCategorySchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  color: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  totalAmount: z.number(),
  percentage: z.number(),
  transactionCount: z.number().optional(),
});

export type TopCategoryDTO = z.infer<typeof topCategorySchema>;

const budgetAlertSchema = z.object({
  categoryName: z.string(),
  percentageUsed: z.number(),
  limit: z.number(),
  spent: z.number(),
});

const biggestExpenseSchema = z.object({
  description: z.string().optional(),
  amount: z.number(),
  date: z.string().optional(),
});

export const summarySchema = z.object({
  month: z.number(),
  year: z.number(),
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netBalance: z.number(),
  topCategory: z
    .object({
      name: z.string(),
      amount: z.number(),
    })
    .optional(),
  transactionCount: z.number(),
  dailyAverage: z.number(),
  biggestExpense: biggestExpenseSchema.optional(),
  budgetAlerts: z.array(budgetAlertSchema).optional(),
  goalAchieved: z.boolean().optional(),
});

export type SummaryDTO = z.infer<typeof summarySchema>;

export const cashFlowSchema = z.object({
  month: z.string(),
  projectedIncome: z.number(),
  projectedOutcome: z.number(),
  projectedNet: z.number(),
});

export type CashFlowDTO = z.infer<typeof cashFlowSchema>;

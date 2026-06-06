import type { z } from "zod/v4";
import type {
  balanceResponseSchema,
  categoryDistributionSchema,
  monthlySeriesSchema,
  comparisonSchema,
  topCategorySchema,
  summarySchema,
  cashFlowSchema,
} from "@/schemas/analytics.schema";

export type BalanceResponse = z.infer<typeof balanceResponseSchema>;
export type CategoryDistribution = z.infer<typeof categoryDistributionSchema>;
export type MonthlySeries = z.infer<typeof monthlySeriesSchema>;
export type Comparison = z.infer<typeof comparisonSchema>;
export type TopCategory = z.infer<typeof topCategorySchema>;
export type Summary = z.infer<typeof summarySchema>;
export type CashFlow = z.infer<typeof cashFlowSchema>;

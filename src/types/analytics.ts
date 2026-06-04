import type { z } from "zod/v4";
import type { balanceResponseSchema, categoryDistributionSchema } from "@/schemas/analytics.schema";

export type BalanceResponse = z.infer<typeof balanceResponseSchema>;
export type CategoryDistribution = z.infer<typeof categoryDistributionSchema>;

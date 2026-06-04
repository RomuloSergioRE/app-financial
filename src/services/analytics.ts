import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import {
  balanceResponseSchema,
  categoryDistributionSchema,
} from "@/schemas/analytics.schema";
import type { BalanceResponse, CategoryDistribution } from "@/types";

export const analyticsService = {
  balance: async (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
  }): Promise<BalanceResponse> => {
    const response = await api.get("/analytics/balance", { params });
    return validateResponse(balanceResponseSchema, response.data);
  },

  categories: async (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
  }): Promise<CategoryDistribution[]> => {
    const response = await api.get("/analytics/categories", { params });
    return validateResponse(
      categoryDistributionSchema.array(),
      response.data
    );
  },
};

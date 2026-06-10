import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import {
  balanceResponseSchema,
  categoryDistributionSchema,
  monthlySeriesSchema,
  topCategorySchema,
  summarySchema,
  cashFlowSchema,
  comparisonSchema,
} from "@/schemas/analytics.schema";
import type { ComparisonDTO } from "@/schemas/analytics.schema";
import type {
  BalanceResponse,
  CategoryDistribution,
  MonthlySeries,
  TopCategory,
  Summary,
  CashFlow,
} from "@/types";

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
    return validateResponse(categoryDistributionSchema.array(), response.data);
  },

  monthlySeries: async (params: {
    startDate: string;
    endDate: string;
  }): Promise<MonthlySeries[]> => {
    const response = await api.get("/analytics/monthly-series", { params });
    return validateResponse(monthlySeriesSchema.array(), response.data);
  },

  comparison: async (params: { month: number; year: number }): Promise<ComparisonDTO> => {
    const response = await api.get("/analytics/comparison", { params });
    return validateResponse(comparisonSchema, response.data);
  },

  topCategories: async (params: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<TopCategory[]> => {
    const response = await api.get("/analytics/top-categories", { params });
    return validateResponse(topCategorySchema.array(), response.data);
  },

  summary: async (params?: { month?: number; year?: number }): Promise<Summary> => {
    const response = await api.get("/analytics/summary", { params });
    return validateResponse(summarySchema, response.data);
  },

  cashFlow: async (params?: { months?: number }): Promise<CashFlow[]> => {
    const response = await api.get("/analytics/cash-flow", { params });
    return validateResponse(cashFlowSchema.array(), response.data);
  },
};

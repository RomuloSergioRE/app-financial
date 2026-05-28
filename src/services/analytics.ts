import api from "./api";
import type {
  BalanceResponse,
  CategoriesAnalyticsResponse,
} from "@/types";

export const analyticsService = {
  balance: (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: number;
  }) =>
    api.get<BalanceResponse>("/analytics/balance", { params }),

  categories: (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: number;
  }) =>
    api.get<CategoriesAnalyticsResponse>("/analytics/categories", {
      params,
    }),
};

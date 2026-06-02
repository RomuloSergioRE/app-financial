import api from "./api";
import type {
  BalanceResponse,
  CategoryDistribution,
} from "@/types";

export const analyticsService = {
  balance: (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
  }) =>
    api.get<BalanceResponse>("/analytics/balance", { params }),

  categories: (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
  }) =>
    api.get<CategoryDistribution[]>("/analytics/categories", {
      params,
    }),
};

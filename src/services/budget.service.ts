import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { budgetSchema } from "@/schemas/budget.schema";
import type { Budget, CreateBudgetRequest, UpdateBudgetRequest } from "@/types";

export const budgetService = {
  list: async (month?: number, year?: number): Promise<Budget[]> => {
    const response = await api.get("/budgets", {
      params: {
        ...(month && { month }),
        ...(year && { year }),
      },
    });
    return validateResponse(budgetSchema.array(), response.data);
  },

  getById: async (id: string): Promise<Budget> => {
    const response = await api.get(`/budgets/${id}`);
    return validateResponse(budgetSchema, response.data);
  },

  create: async (data: CreateBudgetRequest): Promise<Budget> => {
    const response = await api.post("/budgets", data);
    return validateResponse(budgetSchema, response.data);
  },

  update: async (id: string, data: UpdateBudgetRequest): Promise<Budget> => {
    const response = await api.put(`/budgets/${id}`, data);
    return validateResponse(budgetSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/budgets/${id}`);
  },
};

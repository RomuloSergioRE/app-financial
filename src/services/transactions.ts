import api from "./api";
import type {
  Transaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  PaginatedResponse,
} from "@/types";

export const transactionService = {
  list: (page = 1, limit = 10, categoryId?: string, startDate?: string, endDate?: string) =>
    api.get<PaginatedResponse<Transaction>>("/transactions", {
      params: { page, limit, ...(categoryId && { categoryId }), ...(startDate && { startDate }), ...(endDate && { endDate }) },
    }),

  getById: (id: string) =>
    api.get<Transaction>(`/transactions/${id}`),

  create: (data: CreateTransactionRequest) =>
    api.post<Transaction>("/transactions", data),

  update: (id: string, data: UpdateTransactionRequest) =>
    api.put<Transaction>(`/transactions/${id}`, data),

  delete: (id: string) =>
    api.delete(`/transactions/${id}`),
};

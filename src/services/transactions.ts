import api from "./api";
import type {
  Transaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  PaginatedResponse,
} from "@/types";

export const transactionService = {
  list: (page = 1, limit = 10) =>
    api.get<PaginatedResponse<Transaction>>("/transactions", {
      params: { page, limit },
    }),

  getById: (id: number) =>
    api.get<Transaction>(`/transactions/${id}`),

  create: (data: CreateTransactionRequest) =>
    api.post<Transaction>("/transactions", data),

  update: (id: number, data: UpdateTransactionRequest) =>
    api.put<Transaction>(`/transactions/${id}`, data),

  delete: (id: number) =>
    api.delete(`/transactions/${id}`),
};

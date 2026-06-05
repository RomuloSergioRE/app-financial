import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { transactionSchema } from "@/schemas/transaction.schema";
import { paginatedResponseSchema } from "@/schemas/api.schema";
import type { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";

export const transactionService = {
  list: async (
    page = 1,
    limit = 10,
    categoryId?: string,
    startDate?: string,
    endDate?: string,
    search?: string
  ): Promise<PaginatedResponseDTO<Transaction>> => {
    const response = await api.get("/transactions", {
      params: {
        page,
        limit,
        ...(categoryId && { categoryId }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(search && { search }),
      },
    });
    return validateResponse(
      paginatedResponseSchema(transactionSchema),
      response.data
    );
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`);
    return validateResponse(transactionSchema, response.data);
  },

  create: async (data: CreateTransactionRequest): Promise<Transaction> => {
    const response = await api.post("/transactions", data);
    return validateResponse(transactionSchema, response.data);
  },

  update: async (
    id: string,
    data: UpdateTransactionRequest
  ): Promise<Transaction> => {
    const response = await api.put(`/transactions/${id}`, data);
    return validateResponse(transactionSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};

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
    search?: string,
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
    return validateResponse(paginatedResponseSchema(transactionSchema), response.data);
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`);
    return validateResponse(transactionSchema, response.data);
  },

  create: async (data: CreateTransactionRequest): Promise<Transaction> => {
    const response = await api.post("/transactions", data);
    return validateResponse(transactionSchema, response.data);
  },

  update: async (id: string, data: UpdateTransactionRequest): Promise<Transaction> => {
    const response = await api.put(`/transactions/${id}`, data);
    return validateResponse(transactionSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },

  linkTags: async (id: string, tagIds: string[]): Promise<Transaction> => {
    const response = await api.post(`/transactions/${id}/tags`, { tagIds });
    return validateResponse(transactionSchema, response.data);
  },

  unlinkTag: async (id: string, tagId: string): Promise<Transaction> => {
    const response = await api.delete(`/transactions/${id}/tags/${tagId}`);
    return validateResponse(transactionSchema, response.data);
  },

  exportCsv: async (params?: {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<Blob> => {
    const response = await api.get("/transactions/export/csv", {
      params,
      responseType: "blob",
    });
    return response.data;
  },

  exportPdf: async (params?: {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<Blob> => {
    const response = await api.get("/transactions/export/pdf", {
      params,
      responseType: "blob",
    });
    return response.data;
  },

  exportTemplate: async (): Promise<Blob> => {
    const response = await api.get("/transactions/export/template", {
      responseType: "blob",
    });
    return response.data;
  },

  importCsv: async (
    file: File,
  ): Promise<{ imported: number; errors: Array<{ row: number; error: string }> }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/transactions/import/csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

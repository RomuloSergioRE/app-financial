import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { recurringSchema, executeRecurringResponseSchema } from "@/schemas/recurring.schema";
import type { Recurring, CreateRecurringRequest, UpdateRecurringRequest } from "@/types";
import type { ExecuteRecurringResponseDTO } from "@/schemas/recurring.schema";

export const recurringService = {
  list: async (active?: boolean): Promise<Recurring[]> => {
    const response = await api.get("/recurring", {
      params: {
        ...(active !== undefined && { active }),
      },
    });
    return validateResponse(recurringSchema.array(), response.data);
  },

  getById: async (id: string): Promise<Recurring> => {
    const response = await api.get(`/recurring/${id}`);
    return validateResponse(recurringSchema, response.data);
  },

  create: async (data: CreateRecurringRequest): Promise<Recurring> => {
    const response = await api.post("/recurring", data);
    return validateResponse(recurringSchema, response.data);
  },

  update: async (id: string, data: UpdateRecurringRequest): Promise<Recurring> => {
    const response = await api.put(`/recurring/${id}`, data);
    return validateResponse(recurringSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/recurring/${id}`);
  },

  execute: async (id: string): Promise<ExecuteRecurringResponseDTO> => {
    const response = await api.post(`/recurring/${id}/execute`);
    return validateResponse(executeRecurringResponseSchema, response.data);
  },
};

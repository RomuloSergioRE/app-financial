import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { goalSchema } from "@/schemas/goal.schema";
import type { Goal, CreateGoalRequest, UpdateGoalRequest } from "@/types";

export const goalService = {
  list: async (): Promise<Goal[]> => {
    const response = await api.get("/goals");
    return response.data.map((item: unknown) => validateResponse(goalSchema, item));
  },

  getById: async (id: string): Promise<Goal> => {
    const response = await api.get(`/goals/${id}`);
    return validateResponse(goalSchema, response.data);
  },

  create: async (data: CreateGoalRequest): Promise<Goal> => {
    const response = await api.post("/goals", data);
    return validateResponse(goalSchema, response.data);
  },

  update: async (id: string, data: UpdateGoalRequest): Promise<Goal> => {
    const response = await api.put(`/goals/${id}`, data);
    return validateResponse(goalSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/goals/${id}`);
  },
};

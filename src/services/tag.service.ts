import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { tagSchema } from "@/schemas/tag.schema";
import type { Tag, CreateTagRequest, UpdateTagRequest } from "@/types";

export const tagService = {
  list: async (): Promise<Tag[]> => {
    const response = await api.get("/tags");
    return response.data.map((item: unknown) => validateResponse(tagSchema, item));
  },

  getById: async (id: string): Promise<Tag> => {
    const response = await api.get(`/tags/${id}`);
    return validateResponse(tagSchema, response.data);
  },

  create: async (data: CreateTagRequest): Promise<Tag> => {
    const response = await api.post("/tags", data);
    return validateResponse(tagSchema, response.data);
  },

  update: async (id: string, data: UpdateTagRequest): Promise<Tag> => {
    const response = await api.put(`/tags/${id}`, data);
    return validateResponse(tagSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

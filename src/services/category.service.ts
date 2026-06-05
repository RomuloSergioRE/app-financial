import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import { categorySchema } from "@/schemas/category.schema";
import { paginatedResponseSchema } from "@/schemas/api.schema";
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";

export const categoryService = {
  list: async (
    page = 1,
    limit = 50
  ): Promise<PaginatedResponseDTO<Category>> => {
    const response = await api.get("/categories", {
      params: { page, limit },
    });
    return validateResponse(
      paginatedResponseSchema(categorySchema),
      response.data
    );
  },

  getById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return validateResponse(categorySchema, response.data);
  },

  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await api.post("/categories", data);
    return validateResponse(categorySchema, response.data);
  },

  update: async (
    id: string,
    data: UpdateCategoryRequest
  ): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return validateResponse(categorySchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

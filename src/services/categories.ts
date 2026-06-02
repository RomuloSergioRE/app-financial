import api from "./api";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  PaginatedResponse,
} from "@/types";

export const categoryService = {
  list: (page = 1, limit = 50) =>
    api.get<PaginatedResponse<Category>>("/categories", {
      params: { page, limit },
    }),

  getById: (id: string) =>
    api.get<Category>(`/categories/${id}`),

  create: (data: CreateCategoryRequest) =>
    api.post<Category>("/categories", data),

  update: (id: string, data: UpdateCategoryRequest) =>
    api.put<Category>(`/categories/${id}`, data),

  delete: (id: string) =>
    api.delete(`/categories/${id}`),
};

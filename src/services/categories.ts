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

  getById: (id: number) =>
    api.get<Category>(`/categories/${id}`),

  create: (data: CreateCategoryRequest) =>
    api.post<Category>("/categories", data),

  update: (id: number, data: UpdateCategoryRequest) =>
    api.put<Category>(`/categories/${id}`, data),

  delete: (id: number) =>
    api.delete(`/categories/${id}`),
};

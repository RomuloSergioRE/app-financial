import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import {
  adminUserSchema,
  adminUserDetailsSchema,
  globalCategorySchema,
  auditLogSchema,
  overviewSchema,
  performanceSchema,
  userGrowthItemSchema,
  userAnalyticsSchema,
} from "@/schemas/admin.schema";
import type {
  AdminUser,
  AdminUserDetails,
  GlobalCategory,
  AuditLog,
  Overview,
  Performance,
  UserGrowthItem,
  UserAnalytics,
} from "@/types";

export const adminService = {
  listUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<{ data: AdminUser[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> => {
    const response = await api.get("/admin/users", { params });
    return {
      data: validateResponse(adminUserSchema.array(), response.data.data),
      pagination: response.data.pagination,
    };
  },

  getUserDetails: async (userId: string): Promise<AdminUserDetails> => {
    const response = await api.get(`/admin/users/${userId}`);
    return validateResponse(adminUserDetailsSchema, response.data);
  },

  updateUserStatus: async (userId: string, status: "active" | "inactive" | "suspended") => {
    const response = await api.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  updateUserRole: async (userId: string, role: "admin" | "user" | "company") => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  listGlobalCategories: async (): Promise<GlobalCategory[]> => {
    const response = await api.get("/admin/categories");
    return validateResponse(globalCategorySchema.array(), response.data);
  },

  createGlobalCategory: async (data: { name: string; icon?: string; color?: string }): Promise<GlobalCategory> => {
    const response = await api.post("/admin/categories", data);
    return validateResponse(globalCategorySchema, response.data);
  },

  updateGlobalCategory: async (id: string, data: { name?: string; icon?: string; color?: string }): Promise<GlobalCategory> => {
    const response = await api.put(`/admin/categories/${id}`, data);
    return validateResponse(globalCategorySchema, response.data);
  },

  deleteGlobalCategory: async (id: string): Promise<void> => {
    await api.delete(`/admin/categories/${id}`);
  },

  listAuditLogs: async (params?: {
    page?: number;
    limit?: number;
    adminId?: string;
    action?: string;
    targetType?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ data: AuditLog[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> => {
    const response = await api.get("/admin/audit-logs", { params });
    return {
      data: validateResponse(auditLogSchema.array(), response.data.data),
      pagination: response.data.pagination,
    };
  },

  getOverview: async (): Promise<Overview> => {
    const response = await api.get("/admin/overview");
    return validateResponse(overviewSchema, response.data);
  },

  getUserAnalytics: async (userId: string): Promise<UserAnalytics> => {
    const response = await api.get(`/admin/users/${userId}/analytics`);
    return validateResponse(userAnalyticsSchema, response.data);
  },

  getUserGrowth: async (params: { startDate: string; endDate: string; granularity?: "day" | "month" }): Promise<UserGrowthItem[]> => {
    const response = await api.get("/admin/user-growth", { params });
    return validateResponse(userGrowthItemSchema.array(), response.data);
  },

  getPerformance: async (): Promise<Performance> => {
    const response = await api.get("/admin/performance");
    return validateResponse(performanceSchema, response.data);
  },

  exportUsersCsv: async (): Promise<Blob> => {
    const response = await api.get("/admin/export/users", { responseType: "blob" });
    return response.data;
  },

  exportTransactionsCsv: async (params?: { userId?: string; startDate?: string; endDate?: string }): Promise<Blob> => {
    const response = await api.get("/admin/export/transactions", { params, responseType: "blob" });
    return response.data;
  },

  exportAuditLogsCsv: async (): Promise<Blob> => {
    const response = await api.get("/admin/export/audit-logs", { responseType: "blob" });
    return response.data;
  },

  importTransactionsCsv: async (file: File): Promise<Record<string, unknown>> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/admin/import/transactions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

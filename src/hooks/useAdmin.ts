import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  AdminUserDetails,
  GlobalCategory,
  Overview,
  Performance,
  UserAnalytics,
} from "@/types";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function useAdminUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminService.listUsers(params),
  });
}

export function useAdminUserDetails(userId: string): AsyncState<AdminUserDetails> {
  const query = useQuery({
    queryKey: ["admin", "users", userId, "details"],
    queryFn: () => adminService.getUserDetails(userId),
    enabled: !!userId,
  });
  return mapAsyncState(query);
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: "active" | "inactive" | "suspended";
    }) => adminService.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: "admin" | "user" | "company" }) =>
      adminService.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => adminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useGlobalCategories(): AsyncState<GlobalCategory[]> {
  const query = useQuery({
    queryKey: ["admin", "global-categories"],
    queryFn: () => adminService.listGlobalCategories(),
  });
  return mapAsyncState(query);
}

export function useCreateGlobalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; icon?: string; color?: string }) =>
      adminService.createGlobalCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "global-categories"] });
    },
  });
}

export function useUpdateGlobalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; icon?: string; color?: string };
    }) => adminService.updateGlobalCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "global-categories"] });
    },
  });
}

export function useDeleteGlobalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteGlobalCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "global-categories"] });
    },
  });
}

export function useAuditLogs(params?: {
  page?: number;
  limit?: number;
  adminId?: string;
  action?: string;
  targetType?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["admin", "audit-logs", params],
    queryFn: () => adminService.listAuditLogs(params),
  });
}

export function useAdminOverview(): AsyncState<Overview> {
  const query = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => adminService.getOverview(),
  });
  return mapAsyncState(query);
}

export function useAdminUserAnalytics(userId: string): AsyncState<UserAnalytics> {
  const query = useQuery({
    queryKey: ["admin", "users", userId, "analytics"],
    queryFn: () => adminService.getUserAnalytics(userId),
    enabled: !!userId,
  });
  return mapAsyncState(query);
}

export function useUserGrowth(params: {
  startDate: string;
  endDate: string;
  granularity?: "day" | "month";
}) {
  return useQuery({
    queryKey: ["admin", "user-growth", params],
    queryFn: () => adminService.getUserGrowth(params),
  });
}

export function useAdminPerformance(): AsyncState<Performance> {
  const query = useQuery({
    queryKey: ["admin", "performance"],
    queryFn: () => adminService.getPerformance(),
  });
  return mapAsyncState(query);
}

export function useAdminExportUsersCsv() {
  return useMutation({
    mutationFn: () => adminService.exportUsersCsv(),
    onSuccess: (blob) => {
      downloadBlob(blob, `users-${new Date().toISOString().split("T")[0]}.csv`);
    },
  });
}

export function useAdminExportTransactionsCsv() {
  return useMutation({
    mutationFn: (params?: { userId?: string; startDate?: string; endDate?: string }) =>
      adminService.exportTransactionsCsv(params),
    onSuccess: (blob) => {
      downloadBlob(blob, `transactions-${new Date().toISOString().split("T")[0]}.csv`);
    },
  });
}

export function useAdminExportAuditLogsCsv() {
  return useMutation({
    mutationFn: () => adminService.exportAuditLogsCsv(),
    onSuccess: (blob) => {
      downloadBlob(blob, `audit-${new Date().toISOString().split("T")[0]}.csv`);
    },
  });
}

export function useAdminImportTransactionsCsv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => adminService.importTransactionsCsv(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

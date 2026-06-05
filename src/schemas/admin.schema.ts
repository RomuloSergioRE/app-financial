import { z } from "zod/v4";

export const adminUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "user", "company"]),
  status: z.enum(["active", "inactive", "suspended"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AdminUserDTO = z.infer<typeof adminUserSchema>;

export const adminUserDetailsSchema = z.object({
  user: adminUserSchema,
  totalTransactions: z.number(),
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netBalance: z.number(),
});

export type AdminUserDetailsDTO = z.infer<typeof adminUserDetailsSchema>;

export const globalCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GlobalCategoryDTO = z.infer<typeof globalCategorySchema>;

export const auditLogSchema = z.object({
  id: z.string(),
  adminId: z.string(),
  action: z.string(),
  targetId: z.string(),
  targetType: z.string(),
  details: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type AuditLogDTO = z.infer<typeof auditLogSchema>;

export const overviewSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  totalTransactions: z.number(),
  totalIncome: z.number(),
  totalOutcome: z.number(),
  netPlatformBalance: z.number(),
});

export type OverviewDTO = z.infer<typeof overviewSchema>;

export const performanceSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  totalTransactions: z.number(),
  totalAuditLogs: z.number(),
  totalCategories: z.number(),
  totalRequests: z.number(),
  totalErrors: z.number(),
  errorRate: z.number(),
  dbStatus: z.string(),
});

export type PerformanceDTO = z.infer<typeof performanceSchema>;

export const userGrowthItemSchema = z.object({
  period: z.string(),
  newUsers: z.number(),
});

export type UserGrowthItemDTO = z.infer<typeof userGrowthItemSchema>;

export const userAnalyticsSchema = z.object({
  balance: z.object({
    totalIncome: z.number(),
    totalOutcome: z.number(),
    netBalance: z.number(),
  }),
  categories: z.array(
    z.object({
      categoryId: z.string(),
      categoryName: z.string(),
      totalAmount: z.number(),
      percentage: z.number(),
    })
  ),
});

export type UserAnalyticsDTO = z.infer<typeof userAnalyticsSchema>;

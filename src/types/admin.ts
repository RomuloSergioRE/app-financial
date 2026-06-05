import type { z } from "zod/v4";
import type {
  adminUserSchema,
  adminUserDetailsSchema,
  globalCategorySchema,
  auditLogSchema,
  overviewSchema,
  performanceSchema,
  userGrowthItemSchema,
  userAnalyticsSchema,
} from "@/schemas/admin.schema";

export type AdminUser = z.infer<typeof adminUserSchema>;
export type AdminUserDetails = z.infer<typeof adminUserDetailsSchema>;
export type GlobalCategory = z.infer<typeof globalCategorySchema>;
export type AuditLog = z.infer<typeof auditLogSchema>;
export type Overview = z.infer<typeof overviewSchema>;
export type Performance = z.infer<typeof performanceSchema>;
export type UserGrowthItem = z.infer<typeof userGrowthItemSchema>;
export type UserAnalytics = z.infer<typeof userAnalyticsSchema>;

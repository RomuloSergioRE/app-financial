import type { z } from "zod/v4";
import type {
  organizationSchema,
  createOrganizationSchema,
  updateOrganizationSchema,
  orgMemberSchema,
  fiscalReportItemSchema,
} from "@/schemas/organization.schema";

export type Organization = z.infer<typeof organizationSchema>;
export type CreateOrganizationRequest = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationRequest = z.infer<typeof updateOrganizationSchema>;
export type OrgMember = z.infer<typeof orgMemberSchema>;
export type FiscalReportItem = z.infer<typeof fiscalReportItemSchema>;

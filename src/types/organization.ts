import type { z } from "zod/v4";
import type {
  organizationSchema,
  createOrganizationSchema,
  updateOrganizationSchema,
  orgMemberSchema,
  fiscalReportItemSchema,
  selectOrgResponseSchema,
  selectNoneResponseSchema,
  invitedMemberSchema,
  acceptInviteResponseSchema,
  updateMemberRoleResponseSchema,
} from "@/schemas/organization.schema";

export type Organization = z.infer<typeof organizationSchema>;
export type CreateOrganizationRequest = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationRequest = z.infer<typeof updateOrganizationSchema>;
export type OrgMember = z.infer<typeof orgMemberSchema>;
export type FiscalReportItem = z.infer<typeof fiscalReportItemSchema>;
export type SelectOrgResponse = z.infer<typeof selectOrgResponseSchema>;
export type SelectNoneResponse = z.infer<typeof selectNoneResponseSchema>;
export type InvitedMember = z.infer<typeof invitedMemberSchema>;
export type AcceptInviteResponse = z.infer<typeof acceptInviteResponseSchema>;
export type UpdateMemberRoleResponse = z.infer<typeof updateMemberRoleResponseSchema>;

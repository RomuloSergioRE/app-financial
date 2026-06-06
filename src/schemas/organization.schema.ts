import { z } from "zod/v4";

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  role: z.string(),
  memberCount: z.number(),
  createdAt: z.string(),
});

export type OrganizationDTO = z.infer<typeof organizationSchema>;

export const createOrganizationSchema = z.object({
  name: z.string({ message: "Nome é obrigatório" }).min(1, "Nome é obrigatório").trim(),
});

export type CreateOrganizationDTO = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = z.object({
  name: z.string({ message: "Nome é obrigatório" }).min(1, "Nome é obrigatório").trim(),
});

export type UpdateOrganizationDTO = z.infer<typeof updateOrganizationSchema>;

export const orgMemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.enum(["admin", "finance", "viewer"]),
  status: z.enum(["active", "pending"]),
  createdAt: z.string(),
});

export type OrgMemberDTO = z.infer<typeof orgMemberSchema>;

export const fiscalReportItemSchema = z.object({
  month: z.number(),
  categoryName: z.string(),
  total: z.number(),
});

export type FiscalReportItemDTO = z.infer<typeof fiscalReportItemSchema>;

export const selectOrgResponseSchema = z.object({
  organization: organizationSchema,
  token: z.string(),
});

export const selectNoneResponseSchema = z.object({
  token: z.string(),
});

export const invitedMemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  status: z.string(),
});

export const acceptInviteResponseSchema = z.object({
  role: z.string(),
  status: z.string(),
});

export const updateMemberRoleResponseSchema = z.object({
  role: z.string(),
});

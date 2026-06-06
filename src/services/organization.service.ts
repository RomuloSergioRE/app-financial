import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import {
  organizationSchema,
  orgMemberSchema,
  fiscalReportItemSchema,
  selectOrgResponseSchema,
  selectNoneResponseSchema,
  invitedMemberSchema,
  acceptInviteResponseSchema,
  updateMemberRoleResponseSchema,
} from "@/schemas/organization.schema";
import type {
  Organization,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  OrgMember,
  FiscalReportItem,
  SelectOrgResponse,
  SelectNoneResponse,
  InvitedMember,
  AcceptInviteResponse,
  UpdateMemberRoleResponse,
} from "@/types";

export const organizationService = {
  list: async (): Promise<Organization[]> => {
    const response = await api.get("/organizations");
    return validateResponse(organizationSchema.array(), response.data);
  },

  getById: async (id: string): Promise<Organization> => {
    const response = await api.get(`/organizations/${id}`);
    return validateResponse(organizationSchema, response.data);
  },

  create: async (data: CreateOrganizationRequest): Promise<SelectOrgResponse> => {
    const response = await api.post("/organizations", data);
    return validateResponse(selectOrgResponseSchema, response.data);
  },

  update: async (id: string, data: UpdateOrganizationRequest): Promise<Organization> => {
    const response = await api.put(`/organizations/${id}`, data);
    return validateResponse(organizationSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/organizations/${id}`);
  },

  select: async (id: string): Promise<SelectOrgResponse> => {
    const response = await api.patch(`/organizations/${id}/select`);
    return validateResponse(selectOrgResponseSchema, response.data);
  },

  selectNone: async (): Promise<SelectNoneResponse> => {
    const response = await api.patch("/organizations/select-none");
    return validateResponse(selectNoneResponseSchema, response.data);
  },

  listMembers: async (orgId: string): Promise<OrgMember[]> => {
    const response = await api.get(`/organizations/${orgId}/members`);
    return validateResponse(orgMemberSchema.array(), response.data);
  },

  inviteMember: async (orgId: string, email: string, role?: string): Promise<InvitedMember> => {
    const response = await api.post(`/organizations/${orgId}/members`, { email, role });
    return validateResponse(invitedMemberSchema, response.data);
  },

  acceptInvite: async (orgId: string): Promise<AcceptInviteResponse> => {
    const response = await api.patch(`/organizations/${orgId}/accept`, {
      status: "active" as const,
    });
    return validateResponse(acceptInviteResponseSchema, response.data);
  },

  updateMemberRole: async (
    orgId: string,
    memberId: string,
    role: string,
  ): Promise<UpdateMemberRoleResponse> => {
    const response = await api.put(`/organizations/${orgId}/members/${memberId}/role`, { role });
    return validateResponse(updateMemberRoleResponseSchema, response.data);
  },

  removeMember: async (orgId: string, memberId: string): Promise<void> => {
    await api.delete(`/organizations/${orgId}/members/${memberId}`);
  },

  getFiscalReport: async (orgId: string, year: number): Promise<FiscalReportItem[]> => {
    const response = await api.get(`/organizations/${orgId}/fiscal-report`, { params: { year } });
    return validateResponse(fiscalReportItemSchema.array(), response.data);
  },
};

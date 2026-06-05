import api from "./api";
import { validateResponse } from "@/lib/validate-response";
import {
  organizationSchema,
  orgMemberSchema,
  fiscalReportItemSchema,
} from "@/schemas/organization.schema";
import type {
  Organization,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  OrgMember,
  FiscalReportItem,
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

  create: async (data: CreateOrganizationRequest): Promise<{ organization: Organization; token: string }> => {
    const response = await api.post("/organizations", data);
    return response.data;
  },

  update: async (id: string, data: UpdateOrganizationRequest): Promise<Organization> => {
    const response = await api.put(`/organizations/${id}`, data);
    return validateResponse(organizationSchema, response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/organizations/${id}`);
  },

  select: async (id: string): Promise<{ organization: Organization; token: string }> => {
    const response = await api.post(`/organizations/${id}/select`);
    return response.data;
  },

  selectNone: async (): Promise<{ token: string }> => {
    const response = await api.post("/organizations/select-none");
    return response.data;
  },

  listMembers: async (orgId: string): Promise<OrgMember[]> => {
    const response = await api.get(`/organizations/${orgId}/members`);
    return validateResponse(orgMemberSchema.array(), response.data);
  },

  inviteMember: async (orgId: string, email: string, role?: string): Promise<{ id: string; userId: string; role: string; status: string }> => {
    const response = await api.post(`/organizations/${orgId}/invite`, { email, role });
    return response.data;
  },

  acceptInvite: async (orgId: string): Promise<{ role: string; status: string }> => {
    const response = await api.post(`/organizations/${orgId}/accept`);
    return response.data;
  },

  updateMemberRole: async (orgId: string, memberId: string, role: string): Promise<{ role: string }> => {
    const response = await api.put(`/organizations/${orgId}/members/${memberId}`, { role });
    return response.data;
  },

  removeMember: async (orgId: string, memberId: string): Promise<void> => {
    await api.delete(`/organizations/${orgId}/members/${memberId}`);
  },

  getFiscalReport: async (orgId: string, year: number): Promise<FiscalReportItem[]> => {
    const response = await api.get(`/organizations/${orgId}/fiscal-report`, { params: { year } });
    return validateResponse(fiscalReportItemSchema.array(), response.data);
  },
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import { mapAsyncState } from "@/lib/map-async-state";
import { cookie } from "@/lib/cookie";
import type { AsyncState } from "@/types/async";
import type { OrganizationDTO, OrgMemberDTO, FiscalReportItemDTO } from "@/schemas/organization.schema";
import type { CreateOrganizationRequest, UpdateOrganizationRequest } from "@/types";

export function useOrganizations(): AsyncState<OrganizationDTO[]> {
  const query = useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationService.list(),
  });
  return mapAsyncState(query);
}

export function useOrganization(id: string): AsyncState<OrganizationDTO> {
  const query = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => organizationService.getById(id),
    enabled: !!id,
  });
  return mapAsyncState(query);
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrganizationRequest) => organizationService.create(data),
    onSuccess: (result) => {
      cookie.setToken("jwt_token", result.token, 7);
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useUpdateOrganization(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateOrganizationRequest) => organizationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", id] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useSelectOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.select(id),
    onSuccess: (result) => {
      cookie.setToken("jwt_token", result.token, 7);
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useSelectNoneOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => organizationService.selectNone(),
    onSuccess: (result) => {
      cookie.setToken("jwt_token", result.token, 7);
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useOrgMembers(orgId: string): AsyncState<OrgMemberDTO[]> {
  const query = useQuery({
    queryKey: ["organizations", orgId, "members"],
    queryFn: () => organizationService.listMembers(orgId),
    enabled: !!orgId,
  });
  return mapAsyncState(query);
}

export function useInviteMember(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, role }: { email: string; role?: string }) =>
      organizationService.inviteMember(orgId, email, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
  });
}

export function useAcceptInvite(orgId: string) {
  const queryClient = useQueryClient();
  const selectMutation = useSelectOrganization();
  return useMutation({
    mutationFn: () => organizationService.acceptInvite(orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
      selectMutation.mutate(orgId);
    },
  });
}

export function useUpdateMemberRole(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) =>
      organizationService.updateMemberRole(orgId, memberId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
  });
}

export function useRemoveMember(orgId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => organizationService.removeMember(orgId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
  });
}

export function useFiscalReport(orgId: string, year: number): AsyncState<FiscalReportItemDTO[]> {
  const query = useQuery({
    queryKey: ["organizations", orgId, "fiscal-report", year],
    queryFn: () => organizationService.getFiscalReport(orgId, year),
    enabled: !!orgId && !!year,
  });
  return mapAsyncState(query);
}

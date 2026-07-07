import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccessFeature } from "@/lib/permissions";
import { organizationService } from "@/services/organization.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  Organization,
  OrgMember,
  FiscalReportItem,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from "@/types";

export function useOrganizations(): AsyncState<Organization[]> {
  const query = useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationService.list(),
  });
  return mapAsyncState(query);
}

export function useOrganization(id: string): AsyncState<Organization> {
  const query = useQuery({
    queryKey: ["organizations", id],
    queryFn: () => organizationService.getById(id),
    enabled: !!id,
  });
  return mapAsyncState(query);
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: CreateOrganizationRequest) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useUpdateOrganization(id: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: UpdateOrganizationRequest) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", id] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useSelectOrganization() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.select(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useSelectNoneOrganization() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: () => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.selectNone();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useOrgMembers(orgId: string): AsyncState<OrgMember[]> {
  const query = useQuery({
    queryKey: ["organizations", orgId, "members"],
    queryFn: () => organizationService.listMembers(orgId),
    enabled: !!orgId,
  });
  return mapAsyncState(query);
}

export function useInviteMember(orgId: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: ({ email, role }: { email: string; role?: string }) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.inviteMember(orgId, email, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useAcceptInvite(orgId: string) {
  const queryClient = useQueryClient();
  const selectMutation = useSelectOrganization();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: () => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.acceptInvite(orgId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
      selectMutation.mutate(orgId);
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useUpdateMemberRole(orgId: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.updateMemberRole(orgId, memberId, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useRemoveMember(orgId: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (memberId: string) => {
      if (!canAccessFeature(plan, "organizations")) {
        requirePlan("enterprise");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return organizationService.removeMember(orgId, memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
    },
  });
}

export function useFiscalReport(orgId: string, year: number): AsyncState<FiscalReportItem[]> {
  const query = useQuery({
    queryKey: ["organizations", orgId, "fiscal-report", year],
    queryFn: () => organizationService.getFiscalReport(orgId, year),
    enabled: !!orgId && !!year,
  });
  return mapAsyncState(query);
}

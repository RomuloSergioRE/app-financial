import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccessFeature } from "@/lib/permissions";
import { recurringService } from "@/services/recurring.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateRecurringRequest, UpdateRecurringRequest, Recurring } from "@/types";

interface UseRecurringParams {
  active?: boolean;
}

export function useRecurring(params: UseRecurringParams = {}): AsyncState<Recurring[]> {
  const { active } = params;
  const query = useQuery({
    queryKey: ["recurring", active],
    queryFn: () => recurringService.list(active),
  });
  return mapAsyncState(query);
}

export function useRecurringRule(id: string) {
  return useQuery({
    queryKey: ["recurring", id],
    queryFn: () => recurringService.getById(id),
    enabled: !!id,
  });
}

export function useCreateRecurring() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: CreateRecurringRequest) => {
      if (!canAccessFeature(plan, "recurring-rules")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return recurringService.create(data);
    },
    onSuccess: () => {
      toast.success("Regra recorrente criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao criar regra recorrente");
    },
  });
}

export function useUpdateRecurring(id: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: UpdateRecurringRequest) => {
      if (!canAccessFeature(plan, "recurring-rules")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return recurringService.update(id, data);
    },
    onSuccess: () => {
      toast.success("Regra recorrente atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao atualizar regra recorrente");
    },
  });
}

export function useDeleteRecurring() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "recurring-rules")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return recurringService.delete(id);
    },
    onSuccess: () => {
      toast.success("Regra recorrente excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao excluir regra recorrente");
    },
  });
}

export function useExecuteRecurring() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "recurring-rules")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return recurringService.execute(id);
    },
    onSuccess: () => {
      toast.success("Regra executada! Transação gerada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao executar regra recorrente");
    },
  });
}

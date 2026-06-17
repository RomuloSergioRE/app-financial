import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccessFeature } from "@/lib/permissions";
import { goalService } from "@/services/goal.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateGoalRequest, UpdateGoalRequest, Goal } from "@/types";

export function useGoals(): AsyncState<Goal[]> {
  const query = useQuery({
    queryKey: ["goals"],
    queryFn: () => goalService.list(),
  });
  return mapAsyncState(query);
}

export function useGoal(id: string) {
  return useQuery({
    queryKey: ["goals", id],
    queryFn: () => goalService.getById(id),
    enabled: !!id,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: CreateGoalRequest) => {
      if (!canAccessFeature(plan, "goals")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return goalService.create(data);
    },
    onSuccess: () => {
      toast.success("Meta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      if ((error as any) === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao criar meta");
    },
  });
}

export function useUpdateGoal(id: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: UpdateGoalRequest) => {
      if (!canAccessFeature(plan, "goals")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return goalService.update(id, data);
    },
    onSuccess: () => {
      toast.success("Meta atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      if ((error as any) === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao atualizar meta");
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "goals")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return goalService.delete(id);
    },
    onSuccess: () => {
      toast.success("Meta excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      if ((error as any) === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao excluir meta");
    },
  });
}

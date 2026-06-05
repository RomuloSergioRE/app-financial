import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { goalService } from "@/services/goal.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateGoalRequest, UpdateGoalRequest } from "@/types";
import type { GoalDTO } from "@/schemas/goal.schema";

export function useGoals(): AsyncState<GoalDTO[]> {
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
  return useMutation({
    mutationFn: (data: CreateGoalRequest) =>
      goalService.create(data),
    onSuccess: () => {
      toast.success("Meta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      toast.error("Erro ao criar meta");
    },
  });
}

export function useUpdateGoal(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateGoalRequest) =>
      goalService.update(id, data),
    onSuccess: () => {
      toast.success("Meta atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar meta");
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => goalService.delete(id),
    onSuccess: () => {
      toast.success("Meta excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      toast.error("Erro ao excluir meta");
    },
  });
}

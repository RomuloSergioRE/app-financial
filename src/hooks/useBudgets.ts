import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { budgetService } from "@/services/budget.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateBudgetRequest, UpdateBudgetRequest, Budget } from "@/types";

interface UseBudgetsParams {
  month?: number;
  year?: number;
}

export function useBudgets(params: UseBudgetsParams = {}): AsyncState<Budget[]> {
  const { month, year } = params;
  const query = useQuery({
    queryKey: ["budgets", month, year],
    queryFn: () => budgetService.list(month, year),
  });
  return mapAsyncState(query);
}

export function useBudget(id: string) {
  return useQuery({
    queryKey: ["budgets", id],
    queryFn: () => budgetService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBudgetRequest) => budgetService.create(data),
    onSuccess: () => {
      toast.success("Orçamento criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: () => {
      toast.error("Erro ao criar orçamento");
    },
  });
}

export function useUpdateBudget(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateBudgetRequest) => budgetService.update(id, data),
    onSuccess: () => {
      toast.success("Orçamento atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar orçamento");
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => budgetService.delete(id),
    onSuccess: () => {
      toast.success("Orçamento excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: () => {
      toast.error("Erro ao excluir orçamento");
    },
  });
}

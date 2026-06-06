import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
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
  return useMutation({
    mutationFn: (data: CreateRecurringRequest) => recurringService.create(data),
    onSuccess: () => {
      toast.success("Regra recorrente criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: () => {
      toast.error("Erro ao criar regra recorrente");
    },
  });
}

export function useUpdateRecurring(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRecurringRequest) => recurringService.update(id, data),
    onSuccess: () => {
      toast.success("Regra recorrente atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar regra recorrente");
    },
  });
}

export function useDeleteRecurring() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recurringService.delete(id),
    onSuccess: () => {
      toast.success("Regra recorrente excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
    },
    onError: () => {
      toast.error("Erro ao excluir regra recorrente");
    },
  });
}

export function useExecuteRecurring() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recurringService.execute(id),
    onSuccess: () => {
      toast.success("Regra executada! Transação gerada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: () => {
      toast.error("Erro ao executar regra recorrente");
    },
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/atoms/Toast";
import { transactionService } from "@/services/transactions";
import type {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "@/types";

export function useTransactions(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["transactions", page],
    queryFn: () => transactionService.list(page, limit),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => transactionService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      transactionService.create(data),
    onSuccess: () => {
      toast.success("Transação criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: () => {
      toast.error("Erro ao criar transação");
    },
  });
}

export function useUpdateTransaction(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTransactionRequest) =>
      transactionService.update(id, data),
    onSuccess: () => {
      toast.success("Transação atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar transação");
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () => {
      toast.success("Transação excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: () => {
      toast.error("Erro ao excluir transação");
    },
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/atoms/Toast";
import { transactionService } from "@/services/transaction.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";
import type { TransactionDTO } from "@/schemas/transaction.schema";

export function useTransactions(page = 1, limit = 10, categoryId?: string, startDate?: string, endDate?: string, search?: string): AsyncState<PaginatedResponseDTO<TransactionDTO>> {
  const query = useQuery({
    queryKey: ["transactions", page, limit, categoryId, startDate, endDate, search],
    queryFn: () => transactionService.list(page, limit, categoryId, startDate, endDate, search),
  });
  return mapAsyncState(query);
}

function useTransaction(id: string): AsyncState<TransactionDTO> {
  const query = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => transactionService.getById(id),
    enabled: !!id,
  });
  return mapAsyncState(query);
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

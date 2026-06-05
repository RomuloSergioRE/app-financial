import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { transactionService } from "@/services/transaction.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";
import type { TransactionDTO } from "@/schemas/transaction.schema";

interface UseTransactionsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export function useTransactions(params: UseTransactionsParams = {}): AsyncState<PaginatedResponseDTO<TransactionDTO>> {
  const { page = 1, limit = 10, categoryId, startDate, endDate, search } = params;
  const query = useQuery({
    queryKey: ["transactions", page, limit, categoryId, startDate, endDate, search],
    queryFn: () => transactionService.list(page, limit, categoryId, startDate, endDate, search),
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

export function useLinkTags() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, tagIds }: { id: string; tagIds: string[] }) =>
      transactionService.linkTags(id, tagIds),
    onSuccess: () => {
      toast.success("Tags vinculadas com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Erro ao vincular tags");
    },
  });
}

export function useUnlinkTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, tagId }: { id: string; tagId: string }) =>
      transactionService.unlinkTag(id, tagId),
    onSuccess: () => {
      toast.success("Tag removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Erro ao remover tag");
    },
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function useExportTransactionsCsv() {
  return useMutation({
    mutationFn: (params?: { categoryId?: string; startDate?: string; endDate?: string; search?: string }) =>
      transactionService.exportCsv(params),
    onSuccess: (blob) => {
      downloadBlob(blob, `transacoes-${new Date().toISOString().split("T")[0]}.csv`);
      toast.success("CSV exportado com sucesso!");
    },
    onError: () => toast.error("Erro ao exportar CSV"),
  });
}

export function useExportTransactionsPdf() {
  return useMutation({
    mutationFn: (params?: { categoryId?: string; startDate?: string; endDate?: string; search?: string }) =>
      transactionService.exportPdf(params),
    onSuccess: (blob) => {
      downloadBlob(blob, `transacoes-${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF exportado com sucesso!");
    },
    onError: () => toast.error("Erro ao exportar PDF"),
  });
}

export function useExportTransactionsTemplate() {
  return useMutation({
    mutationFn: () => transactionService.exportTemplate(),
    onSuccess: (blob) => {
      downloadBlob(blob, `template-importacao-transacoes.csv`);
      toast.success("Template baixado com sucesso!");
    },
    onError: () => toast.error("Erro ao baixar template"),
  });
}

export function useImportTransactionsCsv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => transactionService.importCsv(file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      if (result.errors.length > 0) {
        toast.warning(`${result.imported} importado(s), ${result.errors.length} erro(s)`);
      } else {
        toast.success(`${result.imported} transação(ões) importada(s) com sucesso!`);
      }
    },
    onError: () => toast.error("Erro ao importar CSV"),
  });
}

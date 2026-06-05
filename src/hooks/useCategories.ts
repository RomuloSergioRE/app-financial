import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { categoryService } from "@/services/category.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";
import type { CategoryDTO } from "@/schemas/category.schema";

interface UseCategoriesParams {
  page?: number;
  limit?: number;
}

export function useCategories(params: UseCategoriesParams = {}): AsyncState<PaginatedResponseDTO<CategoryDTO>> {
  const { page = 1, limit = 50 } = params;
  const query = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => categoryService.list(page, limit),
  });
  return mapAsyncState(query);
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryRequest) =>
      categoryService.create(data),
    onSuccess: () => {
      toast.success("Categoria criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Erro ao criar categoria");
    },
  });
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) =>
      categoryService.update(id, data),
    onSuccess: () => {
      toast.success("Categoria atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar categoria");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      toast.success("Categoria excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Erro ao excluir categoria");
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

export function useExportCategoriesCsv() {
  return useMutation({
    mutationFn: () => categoryService.exportCsv(),
    onSuccess: (blob) => {
      downloadBlob(blob, `categorias-${new Date().toISOString().split("T")[0]}.csv`);
      toast.success("CSV exportado com sucesso!");
    },
    onError: () => toast.error("Erro ao exportar CSV"),
  });
}

export function useExportCategoriesPdf() {
  return useMutation({
    mutationFn: () => categoryService.exportPdf(),
    onSuccess: (blob) => {
      downloadBlob(blob, `categorias-${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF exportado com sucesso!");
    },
    onError: () => toast.error("Erro ao exportar PDF"),
  });
}

export function useImportCategoriesCsv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => categoryService.importCsv(file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (result.errors.length > 0) {
        toast.warning(`${result.imported} importado(s), ${result.errors.length} erro(s)`);
      } else {
        toast.success(`${result.imported} categoria(s) importada(s) com sucesso!`);
      }
    },
    onError: () => toast.error("Erro ao importar CSV"),
  });
}

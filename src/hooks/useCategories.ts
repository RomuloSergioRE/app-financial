import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/atoms/Toast";
import { categoryService } from "@/services/categories";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";
import type { PaginatedResponseDTO } from "@/schemas/api.schema";

export function useCategories(page = 1, limit = 50): AsyncState<PaginatedResponseDTO<CategoryDTO>> {
  const query = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => categoryService.list(page, limit),
  });
  return mapAsyncState(query);
}

type CategoryDTO = {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

function useCategory(id: string): AsyncState<CategoryDTO> {
  const query = useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
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

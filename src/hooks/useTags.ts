import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { tagService } from "@/services/tag.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateTagRequest, UpdateTagRequest } from "@/types";
import type { TagDTO } from "@/schemas/tag.schema";

export function useTags(): AsyncState<TagDTO[]> {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: () => tagService.list(),
  });
  return mapAsyncState(query);
}

export function useTag(id: string) {
  return useQuery({
    queryKey: ["tags", id],
    queryFn: () => tagService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTagRequest) =>
      tagService.create(data),
    onSuccess: () => {
      toast.success("Tag criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Erro ao criar tag");
    },
  });
}

export function useUpdateTag(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTagRequest) =>
      tagService.update(id, data),
    onSuccess: () => {
      toast.success("Tag atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Erro ao atualizar tag");
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tagService.delete(id),
    onSuccess: () => {
      toast.success("Tag excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Erro ao excluir tag");
    },
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccessFeature } from "@/lib/permissions";
import { tagService } from "@/services/tag.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { CreateTagRequest, UpdateTagRequest, Tag } from "@/types";

export function useTags(): AsyncState<Tag[]> {
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
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: CreateTagRequest) => {
      if (!canAccessFeature(plan, "tags")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return tagService.create(data);
    },
    onSuccess: () => {
      toast.success("Tag criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao criar tag");
    },
  });
}

export function useUpdateTag(id: string) {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (data: UpdateTagRequest) => {
      if (!canAccessFeature(plan, "tags")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return tagService.update(id, data);
    },
    onSuccess: () => {
      toast.success("Tag atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao atualizar tag");
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const { plan } = useAuth();
  const { requirePlan } = useUpgradeModal();

  return useMutation({
    mutationFn: (id: string) => {
      if (!canAccessFeature(plan, "tags")) {
        requirePlan("pro");
        return Promise.reject("PLAN_UPGRADE_REQUIRED");
      }
      return tagService.delete(id);
    },
    onSuccess: () => {
      toast.success("Tag excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error: unknown) => {
      if (error === "PLAN_UPGRADE_REQUIRED") return;
      toast.error("Erro ao excluir tag");
    },
  });
}

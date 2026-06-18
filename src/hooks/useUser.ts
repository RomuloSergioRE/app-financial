import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/molecules/Toast";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { User } from "@/types";

export function useProfile(): AsyncState<User> {
  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => userService.getProfile(),
  });
  return mapAsyncState(query);
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: { name?: string; email?: string }) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      refreshUser();
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil");
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      userService.updatePassword(data),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao alterar senha");
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: { currency?: string }) => userService.updateSettings(data),
    onSuccess: () => {
      toast.success("Configurações atualizadas com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      refreshUser();
    },
    onError: () => {
      toast.error("Erro ao atualizar configurações");
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: () => {
      toast.success("Foto atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      refreshUser();
    },
    onError: () => {
      toast.error("Erro ao atualizar foto");
    },
  });
}

export function useRemoveAvatar() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: () => userService.removeAvatar(),
    onSuccess: () => {
      toast.success("Foto removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      refreshUser();
    },
    onError: () => {
      toast.error("Erro ao remover foto");
    },
  });
}

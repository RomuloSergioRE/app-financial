import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/atoms/Toast";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";

export function useProfile(): AsyncState<ProfileDTO> {
  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => userService.getProfile(),
  });
  return mapAsyncState(query);
}

type ProfileDTO = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin" | "company";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  updatedAt: string;
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  return useMutation({
    mutationFn: (data: { name?: string; email?: string }) =>
      userService.updateProfile(data),
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

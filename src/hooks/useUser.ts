import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/atoms/Toast";

export function useProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => userService.getProfile(),
  });
}

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

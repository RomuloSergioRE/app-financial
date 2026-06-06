"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Text } from "@/components/atoms/Text";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { toast } from "@/components/molecules/Toast";
import { useProfile, useUpdateProfile, useUpdatePassword } from "@/hooks/useUser";
import { updateProfileSchema, updatePasswordSchema } from "@/schemas/profile.schema";
import type { UpdateProfileFormData, UpdatePasswordFormData } from "@/schemas/profile.schema";
import * as S from "./style";

export default function PerfilPage() {
  const profileState = useProfile();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();

  const profileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", email: "" },
  });

  const passwordForm = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const user = profileState.status === "success" ? profileState.data : null;

  useEffect(() => {
    if (user) {
      profileForm.reset({ name: user.name, email: user.email });
    }
  }, [user, profileForm]);

  if (profileState.status === "loading") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Perfil
        </Text>
        <Skeleton variant="rect" height="240px" />
        <Skeleton variant="rect" height="200px" />
      </S.Wrapper>
    );
  }

  if (profileState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Perfil
        </Text>
        <Text color="danger">{profileState.error}</Text>
      </S.Wrapper>
    );
  }

  const profileUser = profileState.data;
  const isProfileDirty = profileForm.formState.isDirty;

  const handleSaveProfile = (data: UpdateProfileFormData) => {
    updateProfile.mutate(
      { name: data.name, email: data.email },
      {
        onSuccess: () => toast.success("Perfil atualizado com sucesso!"),
        onError: () => toast.error("Erro ao atualizar perfil."),
      },
    );
  };

  const handleChangePassword = (data: UpdatePasswordFormData) => {
    updatePassword.mutate(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Senha alterada com sucesso!");
          passwordForm.reset();
        },
        onError: () => toast.error("Erro ao alterar senha."),
      },
    );
  };

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Perfil
      </Text>

      <S.Grid>
        <S.Section>
          <S.SectionTitle>Dados pessoais</S.SectionTitle>
          <S.Form onSubmit={profileForm.handleSubmit(handleSaveProfile)}>
            <S.Field>
              <S.Label>Nome</S.Label>
              <Input
                error={profileForm.formState.errors.name?.message}
                {...profileForm.register("name")}
              />
            </S.Field>
            <S.Field>
              <S.Label>Email</S.Label>
              <Input
                error={profileForm.formState.errors.email?.message}
                {...profileForm.register("email")}
              />
            </S.Field>
            <S.FieldRow>
              <S.Field>
                <S.Label>Função</S.Label>
                <S.StaticValue>
                  {profileUser.role === "admin"
                    ? "Administrador"
                    : profileUser.role === "company"
                      ? "Empresa"
                      : "Usuário"}
                </S.StaticValue>
              </S.Field>
              <S.Field>
                <S.Label>Membro desde</S.Label>
                <S.StaticValue>
                  {profileUser.createdAt
                    ? new Date(profileUser.createdAt).toLocaleDateString("pt-BR")
                    : "-"}
                </S.StaticValue>
              </S.Field>
            </S.FieldRow>
            <S.Actions>
              <Button type="submit" disabled={!isProfileDirty} loading={updateProfile.isPending}>
                Salvar
              </Button>
            </S.Actions>
          </S.Form>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Alterar senha</S.SectionTitle>
          <S.Form onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
            <S.Field>
              <S.Label>Senha atual</S.Label>
              <PasswordInput
                error={passwordForm.formState.errors.currentPassword?.message}
                {...passwordForm.register("currentPassword")}
              />
            </S.Field>
            <S.Field>
              <S.Label>Nova senha</S.Label>
              <PasswordInput
                error={passwordForm.formState.errors.newPassword?.message}
                {...passwordForm.register("newPassword")}
              />
            </S.Field>
            <S.Field>
              <S.Label>Confirmar nova senha</S.Label>
              <PasswordInput
                error={passwordForm.formState.errors.confirmPassword?.message}
                {...passwordForm.register("confirmPassword")}
              />
            </S.Field>
            {passwordForm.formState.errors.confirmPassword && (
              <S.ErrorText>{passwordForm.formState.errors.confirmPassword.message}</S.ErrorText>
            )}
            <S.Actions>
              <Button
                type="submit"
                disabled={!passwordForm.formState.isDirty}
                loading={updatePassword.isPending}
              >
                Alterar senha
              </Button>
            </S.Actions>
          </S.Form>
        </S.Section>
      </S.Grid>
    </S.Wrapper>
  );
}

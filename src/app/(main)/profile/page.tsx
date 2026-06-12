"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useCallback } from "react";
import { Text } from "@/components/atoms/Text";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal, ModalForm, ModalActions } from "@/components/molecules/Modal";
import { toast } from "@/components/molecules/Toast";
import { HiOutlineUserCircle, HiOutlineCamera } from "react-icons/hi2";
import { useProfile, useUpdateProfile, useUpdatePassword, useUploadAvatar, useRemoveAvatar } from "@/hooks/useUser";
import { updateProfileSchema, updatePasswordSchema } from "@/schemas/profile.schema";
import type { UpdateProfileFormData, UpdatePasswordFormData } from "@/schemas/profile.schema";
import * as S from "./style";

export default function ProfilePage() {
  const profileState = useProfile();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();
  const uploadAvatar = useUploadAvatar();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const removeAvatar = useRemoveAvatar();

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

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Arquivo muito grande. O tamanho máximo é 2MB.");
      e.target.value = "";
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    uploadAvatar.mutate(file, {
      onSuccess: () => setPreviewUrl(null),
      onError: () => {
        setPreviewUrl(null);
        toast.error("Erro ao enviar foto. Verifique o tamanho do arquivo.");
      },
    });
    e.target.value = "";
  }, [uploadAvatar]);

  const handleRemoveAvatar = useCallback(() => {
    removeAvatar.mutate();
  }, [removeAvatar]);

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

  const currentAvatar = previewUrl || (profileUser.avatarUrl ? `${apiUrl}${profileUser.avatarUrl}` : null);

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Perfil
      </Text>

      <S.Grid>
        <S.Section>
          <S.SectionTitle>Dados pessoais</S.SectionTitle>

          <S.AvatarSection onClick={() => setModalOpen(true)}>
            <S.AvatarWrapper>
              <S.AvatarPreview>
                {currentAvatar ? (
                  <S.AvatarImage src={currentAvatar} alt="Foto do perfil" />
                ) : (
                  <S.AvatarFallback>
                    <HiOutlineUserCircle size={48} />
                  </S.AvatarFallback>
                )}
              </S.AvatarPreview>
              <S.AvatarBadge>
                <HiOutlineCamera size={16} />
              </S.AvatarBadge>
            </S.AvatarWrapper>
          </S.AvatarSection>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileSelect}
          />

          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Alterar foto">
            <ModalForm>
              <S.ModalPreview>
                {currentAvatar ? (
                  <S.ModalImage src={currentAvatar} alt="Preview" />
                ) : (
                  <HiOutlineUserCircle size={80} />
                )}
              </S.ModalPreview>

              <Text as="p" size="xs" color="textMuted" align="center">
                Máximo 2MB · PNG, JPG, WEBP
              </Text>

              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                loading={uploadAvatar.isPending}
                fullWidth
              >
                {uploadAvatar.isPending ? "Enviando..." : "Escolher arquivo"}
              </Button>

              {profileUser.avatarUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveAvatar}
                  disabled={uploadAvatar.isPending}
                  fullWidth
                >
                  Remover foto
                </Button>
              )}

              <ModalActions>
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
              </ModalActions>
            </ModalForm>
          </Modal>

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

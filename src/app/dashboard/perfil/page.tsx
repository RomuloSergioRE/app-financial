"use client";

import { useState, useEffect } from "react";
import { Text } from "@/components/atoms/Text";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { useProfile, useUpdateProfile, useUpdatePassword } from "@/hooks/useUser";
import * as S from "./style";

export default function PerfilPage() {
  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = profileData?.data;
  const isProfileDirty = name !== user?.name || email !== user?.email;

  const handleSaveProfile = () => {
    updateProfile.mutate(
      { name, email },
      { onSuccess: () => { setName(""); setEmail(""); } }
    );
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) return;
    updatePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <S.Wrapper>
        <Text as="h1" size="xxl" weight="bold">Perfil</Text>
        <Text>Carregando...</Text>
      </S.Wrapper>
    );
  }

  if (!user) {
    return (
      <S.Wrapper>
        <Text as="h1" size="xxl" weight="bold">Perfil</Text>
        <Text>Erro ao carregar perfil.</Text>
      </S.Wrapper>
    );
  }

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Perfil</Text>

      <S.Section>
        <S.SectionTitle>Dados pessoais</S.SectionTitle>
        <S.Field>
          <S.Label>Nome</S.Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </S.Field>
        <S.Field>
          <S.Label>Email</S.Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </S.Field>
        <S.Field>
          <S.Label>Função</S.Label>
          <S.StaticValue>{user.role === "admin" ? "Administrador" : "Usuário"}</S.StaticValue>
        </S.Field>
        <S.Field>
          <S.Label>Membro desde</S.Label>
          <S.StaticValue>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("pt-BR")
              : "-"}
          </S.StaticValue>
        </S.Field>
        <S.Actions>
          <Button onClick={handleSaveProfile} disabled={!isProfileDirty} loading={updateProfile.isPending}>
            Salvar
          </Button>
        </S.Actions>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Alterar senha</S.SectionTitle>
        <S.Field>
          <S.Label>Senha atual</S.Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </S.Field>
        <S.Field>
          <S.Label>Nova senha</S.Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </S.Field>
        <S.Field>
          <S.Label>Confirmar nova senha</S.Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </S.Field>
        {newPassword && confirmPassword && newPassword !== confirmPassword && (
          <S.ErrorText>As senhas não conferem</S.ErrorText>
        )}
        <S.Actions>
          <Button
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            loading={updatePassword.isPending}
          >
            Alterar senha
          </Button>
        </S.Actions>
      </S.Section>
    </S.Wrapper>
  );
}

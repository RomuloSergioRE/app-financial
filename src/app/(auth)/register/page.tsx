"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import styled from "styled-components";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FormLink } from "@/components/molecules/FormLink";
import { Text } from "@/components/atoms/Text";
import { registerSchema, type RegisterFormData } from "@/schemas/register";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      window.location.href = "/";
    } catch (err: unknown) {
      setApiError(
        extractErrorMessage(err, "Erro ao cadastrar. Tente novamente.")
      );
    }
  };

  return (
    <AuthCard title="Criar Conta">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBody>
          <FormField label="Nome" error={errors.name?.message}>
            <Input
              type="text"
              placeholder="Seu nome"
              error={errors.name?.message}
              {...register("name")}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </FormField>

          <FormField label="Senha" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="Mínimo 8 caracteres"
              error={errors.password?.message}
              {...register("password")}
            />
          </FormField>

          <FormField
            label="Confirmar Senha"
            error={errors.confirmPassword?.message}
          >
            <Input
              type="password"
              placeholder="Repita a senha"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </FormField>

          {apiError && (
            <Text as="span" size="sm" color="error">
              {apiError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Cadastrar
          </Button>

          <FormLink
            text="Já tem conta?"
            linkText="Entrar"
            href="/login"
          />
        </FormBody>
      </form>
    </AuthCard>
  );
}

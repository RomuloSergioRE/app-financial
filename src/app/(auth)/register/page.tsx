"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { Button } from "@/components/atoms/Button";
import { FormLink } from "@/components/molecules/FormLink";
import { Text } from "@/components/atoms/Text";
import { registerSchema } from "@/schemas/auth.schema";
import type { RegisterDTO as RegisterFormData } from "@/schemas/auth.schema";
import { toast } from "@/components/atoms/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";
import * as S from "./style";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
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
      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch (err: unknown) {
      setApiError(
        extractErrorMessage(err, "Erro ao cadastrar. Tente novamente.")
      );
    }
  };

  return (
    <AuthCard title="Criar Conta">
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormBody>
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
            <PasswordInput
              placeholder="Mínimo 8 caracteres"
              error={errors.password?.message}
              {...register("password")}
            />
          </FormField>

          <FormField
            label="Confirmar Senha"
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              placeholder="Repita a senha"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </FormField>

          {apiError && (
            <Text as="span" size="sm" color="danger">
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
        </S.FormBody>
      </form>
    </AuthCard>
  );
}

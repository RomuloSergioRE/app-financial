"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { Button } from "@/components/atoms/Button";
import { FormLink } from "@/components/molecules/FormLink";
import { Text } from "@/components/atoms/Text";
import { loginSchema } from "@/schemas/auth.schema";
import type { LoginDTO as LoginFormData } from "@/schemas/auth.schema";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";
import * as S from "./style";

export default function LoginPage() {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(null);
      const user = await login(data);
      toast.success("Login realizado com sucesso!");
      const redirectTo = user.role === "admin" ? "/admin" : "/dashboard";
      window.location.href = redirectTo;
    } catch (err: unknown) {
      setApiError(extractErrorMessage(err, "Erro ao fazer login. Verifique suas credenciais."));
    }
  };

  return (
    <AuthCard title="Entrar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormBody>
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
              placeholder="Sua senha"
              error={errors.password?.message}
              {...register("password")}
            />
          </FormField>

          {apiError && (
            <Text as="span" size="sm" color="danger">
              {apiError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Entrar
          </Button>

          <FormLink text="Não tem conta?" linkText="Cadastre-se" href="/register" />
        </S.FormBody>
      </form>
    </AuthCard>
  );
}

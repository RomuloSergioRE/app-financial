"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FormLink } from "@/components/molecules/FormLink";
import { Text } from "@/components/atoms/Text";
import { loginSchema, type LoginFormData } from "@/schemas/login";
import { toast } from "@/components/atoms/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";
import * as S from "./style";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
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
      await login(data);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err: unknown) {
      setApiError(
        extractErrorMessage(err, "Erro ao fazer login. Verifique suas credenciais.")
      );
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
            <Input
              type="password"
              placeholder="Sua senha"
              error={errors.password?.message}
              {...register("password")}
            />
          </FormField>

          {apiError && (
            <Text as="span" size="sm" color="error">
              {apiError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Entrar
          </Button>

          <FormLink
            text="Não tem conta?"
            linkText="Cadastre-se"
            href="/register"
          />
        </S.FormBody>
      </form>
    </AuthCard>
  );
}

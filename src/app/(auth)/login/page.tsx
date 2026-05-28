"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { loginSchema, type LoginFormData } from "@/schemas/login";
import { useAuth } from "@/contexts/AuthContext";

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
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao fazer login. Verifique suas credenciais.";
      setApiError(message);
    }
  };

  return (
    <AuthCard title="Entrar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
            <span style={{ color: "#EF4444", fontSize: "0.875rem" }}>
              {apiError}
            </span>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Entrar
          </Button>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6B7280",
            }}
          >
            Não tem conta?{" "}
            <Link
              href="/register"
              style={{ color: "#4F46E5", fontWeight: 600 }}
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}

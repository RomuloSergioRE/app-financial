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
import { registerSchema, type RegisterFormData } from "@/schemas/register";
import { useAuth } from "@/contexts/AuthContext";

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
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao cadastrar. Tente novamente.";
      setApiError(message);
    }
  };

  return (
    <AuthCard title="Criar Conta">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
              placeholder="Mínimo 6 caracteres"
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
            <span style={{ color: "#EF4444", fontSize: "0.875rem" }}>
              {apiError}
            </span>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Cadastrar
          </Button>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6B7280",
            }}
          >
            Já tem conta?{" "}
            <Link href="/login" style={{ color: "#4F46E5", fontWeight: 600 }}>
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}

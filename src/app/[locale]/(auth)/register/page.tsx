"use client";

import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { AuthCard } from "@/components/molecules/AuthCard";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { Button } from "@/components/atoms/Button";
import { FormLink } from "@/components/molecules/FormLink";
import { Text } from "@/components/atoms/Text";
import { Select } from "@/components/molecules/Select";
import { registerSchema } from "@/schemas/auth.schema";
import type { RegisterDTO as RegisterFormData } from "@/schemas/auth.schema";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";
import * as S from "./style";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const { field: roleField } = useController({
    name: "role",
    control,
    defaultValue: "user",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      toast.success(t("sucesso"));
      router.push("/dashboard");
    } catch (err: unknown) {
      setApiError(extractErrorMessage(err, t("erro")));
    }
  };

  return (
    <AuthCard title={t("titulo")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormBody>
          <FormField label={t("nome")} error={errors.name?.message}>
            <Input
              type="text"
              placeholder={t("nomePlaceholder")}
              error={errors.name?.message}
              {...register("name")}
            />
          </FormField>

          <FormField label={t("email")} error={errors.email?.message}>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              error={errors.email?.message}
              {...register("email")}
            />
          </FormField>

          <FormField label={t("senha")} error={errors.password?.message}>
            <PasswordInput
              placeholder={t("senhaPlaceholder")}
              error={errors.password?.message}
              {...register("password")}
            />
          </FormField>

          <FormField label={t("confirmarSenha")} error={errors.confirmPassword?.message}>
            <PasswordInput
              placeholder={t("confirmarSenhaPlaceholder")}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </FormField>

          <FormField label={t("tipoConta")} error={errors.role?.message}>
            <Select
              value={roleField.value}
              onChange={roleField.onChange}
              options={[
                { value: "user", label: t("usuario") },
                { value: "company", label: t("empresa") },
              ]}
            />
          </FormField>

          {apiError && (
            <Text as="span" size="sm" color="danger">
              {apiError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            {t("botao")}
          </Button>

          <FormLink text={t("temConta")} linkText={t("entrar")} href="/login" />
          <FormLink text="←" linkText={t("voltar")} href="/" />
        </S.FormBody>
      </form>
    </AuthCard>
  );
}

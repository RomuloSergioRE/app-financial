"use client";

import { useForm } from "react-hook-form";
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
import { loginSchema } from "@/schemas/auth.schema";
import type { LoginDTO as LoginFormData } from "@/schemas/auth.schema";
import { toast } from "@/components/molecules/Toast";
import { useAuth } from "@/contexts/AuthContext";
import { extractErrorMessage } from "@/utils/errors";
import * as S from "./style";

export default function LoginPage() {
  const t = useTranslations("auth.login");
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
      const user = await login(data);
      toast.success(t("sucesso"));
      const redirectTo = user.role === "admin" ? "/admin" : "/dashboard";
      router.replace(redirectTo);
    } catch (err: unknown) {
      setApiError(extractErrorMessage(err, t("erro")));
    }
  };

  return (
    <AuthCard title={t("titulo")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormBody>
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

          {apiError && (
            <Text as="span" size="sm" color="danger">
              {apiError}
            </Text>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            {t("botao")}
          </Button>

          <FormLink text={t("semConta")} linkText={t("cadastrar")} href="/register" />
          <FormLink text="←" linkText={t("voltar")} href="/" />
        </S.FormBody>
      </form>
    </AuthCard>
  );
}

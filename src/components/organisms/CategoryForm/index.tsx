"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { createCategorySchema } from "@/schemas/category.schema";
import type { CreateCategoryDTO } from "@/schemas/category.schema";
import * as S from "./style";

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateCategoryDTO>;
  onCancel?: () => void;
}

export function CategoryForm({
  onSubmit,
  isLoading = false,
  submitLabel,
  initialData,
  onCancel,
}: CategoryFormProps) {
  const t = useTranslations("categories");
  const ct = useTranslations("common");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      ...initialData,
    },
  });

  const isModal = !!onCancel;

  if (isModal) {
    return (
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <S.ModalForm>
          <S.FormGroup>
            <S.Label>{t("nome")}</S.Label>
            <Input error={errors.name?.message} {...register("name")} />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>{t("corHex")}</S.Label>
            <Input placeholder={t("corPlaceholder")} error={errors.color?.message} {...register("color")} />
          </S.FormGroup>
          <S.ModalActions>
            <Button variant="outline" onClick={onCancel} type="button">
              {ct("cancelar")}
            </Button>
            <Button type="submit" loading={isLoading}>
              {submitLabel ?? ct("salvar")}
            </Button>
          </S.ModalActions>
        </S.ModalForm>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <S.FormRow>
        <S.FormField>
          <Input
            placeholder={t("nome")}
            error={errors.name?.message}
            {...register("name")}
          />
        </S.FormField>
        <Button type="submit" loading={isLoading} disabled={!isValid}>
          {submitLabel ?? ct("salvar")}
        </Button>
      </S.FormRow>
    </form>
  );
}

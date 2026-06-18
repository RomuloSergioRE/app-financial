"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/molecules/Select";
import { Button } from "@/components/atoms/Button";
import { createTransactionSchema } from "@/schemas/transaction.schema";
import type { CreateTransactionDTO } from "@/schemas/transaction.schema";
import * as S from "./style";

interface TransactionFormProps {
  categories: { id: string; name: string }[];
  onSubmit: (data: CreateTransactionDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateTransactionDTO>;
  variant: "inline" | "modal";
  onCancel?: () => void;
}

export function TransactionForm({
  categories,
  onSubmit,
  isLoading = false,
  submitLabel,
  initialData,
  variant,
  onCancel,
}: TransactionFormProps) {
  const t = useTranslations("transactions");
  const ct = useTranslations("common");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateTransactionDTO>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "outcome",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
      ...initialData,
    },
  });

  const isModal = variant === "modal";
  const typeValue = useWatch({ control, name: "type" });
  const categoryIdValue = useWatch({ control, name: "categoryId" });

  const fields = (
    <>
      <FormField label={t("descricao")} error={errors.description?.message}>
        <Input
          placeholder={t("descricaoPlaceholder")}
          error={errors.description?.message}
          {...register("description")}
        />
      </FormField>

      <FormField label={t("valor")} error={errors.amount?.message}>
        <Input
          type="number"
          step="0.01"
          min={0}
          placeholder={t("valorPlaceholder")}
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />
      </FormField>

      {isModal ? (
        <>
          <FormField label={t("tipo")} error={errors.type?.message}>
            <Select
              value={typeValue}
              onChange={(v) => setValue("type", v as "income" | "outcome")}
              options={[
                { value: "outcome", label: t("saida") },
                { value: "income", label: t("entrada") },
              ]}
            />
          </FormField>
          <FormField label={t("categoria")} error={errors.categoryId?.message}>
            <Select
              value={categoryIdValue}
              onChange={(v) => setValue("categoryId", v)}
              options={[
                { value: "", label: t("selecione") },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </FormField>
          <FormField label={t("data")} error={errors.date?.message}>
            <Input type="date" error={errors.date?.message} {...register("date")} />
          </FormField>
        </>
      ) : (
        <S.FormRow>
          <FormField label={t("tipo")} error={errors.type?.message}>
            <Select
              value={typeValue}
              onChange={(v) => setValue("type", v as "income" | "outcome")}
              options={[
                { value: "outcome", label: t("saida") },
                { value: "income", label: t("entrada") },
              ]}
            />
          </FormField>
          <FormField label={t("categoria")} error={errors.categoryId?.message}>
            <Select
              value={categoryIdValue}
              onChange={(v) => setValue("categoryId", v)}
              options={[
                { value: "", label: t("selecione") },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </FormField>
          <FormField label={t("data")} error={errors.date?.message}>
            <Input type="date" error={errors.date?.message} {...register("date")} />
          </FormField>
        </S.FormRow>
      )}
    </>
  );

  if (isModal) {
    return (
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <S.ModalForm>
          {fields}
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
      <S.Form>
        {fields}
        <Button type="submit" loading={isLoading} disabled={!isValid}>
          {submitLabel ?? ct("salvar")}
        </Button>
      </S.Form>
    </form>
  );
}

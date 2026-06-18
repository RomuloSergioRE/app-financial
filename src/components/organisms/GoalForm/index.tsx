"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/molecules/Select";
import { Button } from "@/components/atoms/Button";
import { createGoalSchema } from "@/schemas/goal.schema";
import type { CreateGoalDTO } from "@/schemas/goal.schema";
import * as S from "./style";

interface GoalFormProps {
  categories: { id: string; name: string }[];
  onSubmit: (data: CreateGoalDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateGoalDTO>;
  onCancel?: () => void;
}

export function GoalForm({
  categories,
  onSubmit,
  isLoading = false,
  submitLabel,
  initialData,
  onCancel,
}: GoalFormProps) {
  const t = useTranslations("goals");
  const ct = useTranslations("common");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateGoalDTO>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      categoryId: "",
      deadline: "",
      ...initialData,
    },
  });

  const isModal = !!onCancel;
  const categoryIdValue = useWatch({ control, name: "categoryId" });

  const fields = (
    <>
      <FormField label={t("nome")} error={errors.name?.message}>
        <Input
          placeholder="Ex: Reserva de emergência"
          error={errors.name?.message}
          {...register("name")}
        />
      </FormField>

      <FormField label={t("valorAlvo")} error={errors.targetAmount?.message}>
        <Input
          type="number"
          step="0.01"
          min={0}
          placeholder="0,00"
          error={errors.targetAmount?.message}
          {...register("targetAmount", { valueAsNumber: true })}
        />
      </FormField>

      <FormField label={t("categoriaOpcional")} error={errors.categoryId?.message}>
        <Select
          value={categoryIdValue ?? ""}
          onChange={(v) => setValue("categoryId", v || "")}
          options={[
            { value: "", label: t("todasCategorias") },
            ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
        />
      </FormField>

      <FormField label={t("prazoOpcional")} error={errors.deadline?.message}>
        <Input type="date" error={errors.deadline?.message} {...register("deadline")} />
      </FormField>
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

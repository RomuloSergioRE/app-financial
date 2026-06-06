"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  submitLabel = "Salvar",
  initialData,
  onCancel,
}: GoalFormProps) {
  const {
    register,
    handleSubmit,
    watch,
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

  const fields = (
    <>
      <FormField label="Nome" error={errors.name?.message}>
        <Input
          placeholder="Ex: Reserva de emergência"
          error={errors.name?.message}
          {...register("name")}
        />
      </FormField>

      <FormField label="Valor Alvo (R$)" error={errors.targetAmount?.message}>
        <Input
          type="number"
          step="0.01"
          min={0}
          placeholder="0,00"
          error={errors.targetAmount?.message}
          {...register("targetAmount", { valueAsNumber: true })}
        />
      </FormField>

      <FormField label="Categoria (opcional)" error={errors.categoryId?.message}>
        <Select
          value={watch("categoryId") ?? ""}
          onChange={(v) => setValue("categoryId", v || "")}
          options={[
            { value: "", label: "Todas as categorias" },
            ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
        />
      </FormField>

      <FormField label="Prazo (opcional)" error={errors.deadline?.message}>
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
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              {submitLabel}
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
          {submitLabel}
        </Button>
      </S.Form>
    </form>
  );
}

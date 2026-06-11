"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/molecules/Select";
import { Button } from "@/components/atoms/Button";
import { createRecurringSchema } from "@/schemas/recurring.schema";
import type { CreateRecurringDTO } from "@/schemas/recurring.schema";
import * as S from "./style";

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensal" },
  { value: "yearly", label: "Anual" },
];

const TYPE_OPTIONS = [
  { value: "outcome", label: "Saída" },
  { value: "income", label: "Entrada" },
];

interface RecurringFormProps {
  categories: { id: string; name: string }[];
  onSubmit: (data: CreateRecurringDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateRecurringDTO>;
  onCancel?: () => void;
}

export function RecurringForm({
  categories,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
  initialData,
  onCancel,
}: RecurringFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateRecurringDTO>({
    resolver: zodResolver(createRecurringSchema),
    defaultValues: {
      categoryId: "",
      description: "",
      amount: 0,
      type: "outcome",
      frequency: "monthly",
      interval: 1,
      nextDate: new Date().toISOString().split("T")[0],
      endDate: "",
      ...initialData,
    },
  });

  const isModal = !!onCancel;
  const typeValue = useWatch({ control, name: "type" });
  const categoryIdValue = useWatch({ control, name: "categoryId" });
  const frequencyValue = useWatch({ control, name: "frequency" });

  const fields = (
    <>
      <FormField label="Descrição" error={errors.description?.message}>
        <Input
          placeholder="Ex: Aluguel"
          error={errors.description?.message}
          {...register("description")}
        />
      </FormField>

      <FormField label="Valor (R$)" error={errors.amount?.message}>
        <Input
          type="number"
          step="0.01"
          min={0}
          placeholder="0,00"
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />
      </FormField>

      <S.Row>
        <FormField label="Tipo" error={errors.type?.message}>
          <Select
            value={typeValue}
            onChange={(v) => setValue("type", v as "income" | "outcome")}
            options={TYPE_OPTIONS}
          />
        </FormField>

        <FormField label="Categoria" error={errors.categoryId?.message}>
          <Select
            value={categoryIdValue}
            onChange={(v) => setValue("categoryId", v)}
            options={[
              { value: "", label: "Selecione..." },
              ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
            ]}
          />
        </FormField>
      </S.Row>

      <S.Row>
        <FormField label="Frequência" error={errors.frequency?.message}>
          <Select
            value={frequencyValue}
            onChange={(v) => setValue("frequency", v as "daily" | "weekly" | "monthly" | "yearly")}
            options={FREQUENCY_OPTIONS}
          />
        </FormField>

        <FormField label="Intervalo" error={errors.interval?.message}>
          <Input
            type="number"
            min={1}
            placeholder="1"
            error={errors.interval?.message}
            {...register("interval", { valueAsNumber: true })}
          />
        </FormField>
      </S.Row>

      <S.Row>
        <FormField label="Próxima Data" error={errors.nextDate?.message}>
          <Input type="date" error={errors.nextDate?.message} {...register("nextDate")} />
        </FormField>

        <FormField label="Data Final (opcional)" error={errors.endDate?.message}>
          <Input type="date" error={errors.endDate?.message} {...register("endDate")} />
        </FormField>
      </S.Row>
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

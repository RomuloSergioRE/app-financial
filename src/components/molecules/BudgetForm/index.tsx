"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/molecules/Select";
import { Button } from "@/components/atoms/Button";
import { createBudgetSchema } from "@/schemas/budget.schema";
import type { CreateBudgetDTO } from "@/schemas/budget.schema";
import * as S from "./style";

const MONTHS = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

function generateYearOptions() {
  const current = new Date().getFullYear();
  const years = [];
  for (let y = current - 1; y <= current + 3; y++) {
    years.push({ value: String(y), label: String(y) });
  }
  return years;
}

interface BudgetFormProps {
  categories: { id: string; name: string }[];
  onSubmit: (data: CreateBudgetDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateBudgetDTO>;
  onCancel?: () => void;
}

export function BudgetForm({
  categories,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
  initialData,
  onCancel,
}: BudgetFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateBudgetDTO>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      categoryId: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      limit: 0,
      ...initialData,
    },
  });

  const isModal = !!onCancel;

  const fields = (
    <>
      <FormField label="Categoria" error={errors.categoryId?.message}>
        <Select
          value={String(watch("categoryId"))}
          onChange={(v) => setValue("categoryId", v)}
          options={[
            { value: "", label: "Selecione..." },
            ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
        />
      </FormField>

      <S.Row>
        <FormField label="Mês" error={errors.month?.message}>
          <Select
            value={String(watch("month"))}
            onChange={(v) => setValue("month", Number(v))}
            options={MONTHS}
          />
        </FormField>

        <FormField label="Ano" error={errors.year?.message}>
          <Select
            value={String(watch("year"))}
            onChange={(v) => setValue("year", Number(v))}
            options={generateYearOptions()}
          />
        </FormField>
      </S.Row>

      <FormField label="Limite (R$)" error={errors.limit?.message}>
        <Input
          type="number"
          step="0.01"
          min={0}
          placeholder="0,00"
          error={errors.limit?.message}
          {...register("limit", { valueAsNumber: true })}
        />
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

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  onCancel?: () => void;
}

export function TransactionForm({
  categories,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
  initialData,
  onCancel,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
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

  const isModal = !!onCancel;

  const fields = (
    <>
      <FormField label="Descrição" error={errors.description?.message}>
        <Input
          placeholder="Ex: Supermercado"
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

      {isModal ? (
        <>
          <FormField label="Tipo" error={errors.type?.message}>
            <Select
              value={watch("type")}
              onChange={(v) => setValue("type", v as "income" | "outcome")}
              options={[
                { value: "outcome", label: "Saída" },
                { value: "income", label: "Entrada" },
              ]}
            />
          </FormField>
          <FormField label="Categoria" error={errors.categoryId?.message}>
            <Select
              value={watch("categoryId")}
              onChange={(v) => setValue("categoryId", v)}
              options={[
                { value: "", label: "Selecione" },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </FormField>
          <FormField label="Data" error={errors.date?.message}>
            <Input type="date" error={errors.date?.message} {...register("date")} />
          </FormField>
        </>
      ) : (
        <S.FormRow>
          <FormField label="Tipo" error={errors.type?.message}>
            <Select
              value={watch("type")}
              onChange={(v) => setValue("type", v as "income" | "outcome")}
              options={[
                { value: "outcome", label: "Saída" },
                { value: "income", label: "Entrada" },
              ]}
            />
          </FormField>
          <FormField label="Categoria" error={errors.categoryId?.message}>
            <Select
              value={watch("categoryId")}
              onChange={(v) => setValue("categoryId", v)}
              options={[
                { value: "", label: "Selecione" },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </FormField>
          <FormField label="Data" error={errors.date?.message}>
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

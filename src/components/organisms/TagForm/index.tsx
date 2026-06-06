"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { createTagSchema } from "@/schemas/tag.schema";
import type { CreateTagDTO } from "@/schemas/tag.schema";
import * as S from "./style";

interface TagFormProps {
  onSubmit: (data: CreateTagDTO) => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialData?: Partial<CreateTagDTO>;
  onCancel?: () => void;
}

export function TagForm({
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
  initialData,
  onCancel,
}: TagFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateTagDTO>({
    resolver: zodResolver(createTagSchema),
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
            <S.Label>Nome</S.Label>
            <Input error={errors.name?.message} {...register("name")} />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Cor (hex)</S.Label>
            <Input placeholder="#4F46E5" error={errors.color?.message} {...register("color")} />
          </S.FormGroup>
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
      <S.FormRow>
        <S.FormField>
          <Input placeholder="Nome da tag" error={errors.name?.message} {...register("name")} />
        </S.FormField>
        <Button type="submit" loading={isLoading} disabled={!isValid}>
          {submitLabel}
        </Button>
      </S.FormRow>
    </form>
  );
}

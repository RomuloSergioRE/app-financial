"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from "react-icons/hi2";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";
import { createCategorySchema } from "@/schemas/category.schema";
import type { CreateCategoryDTO } from "@/schemas/category.schema";
import type { Category } from "@/types";
import * as S from "./style";

export default function CategoriasPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const categoriesState = useCategories();
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();
  const updateMutation = useUpdateCategory(editingCategory?.id ?? "");

  const createForm = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "" },
  });

  const editForm = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", color: "" },
  });

  const handleCreate = (data: CreateCategoryDTO) => {
    createMutation.mutate(
      { name: data.name },
      {
        onSuccess: () => createForm.reset({ name: "" }),
        onError: () => {},
      }
    );
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
    editForm.reset({ name: cat.name, color: cat.color ?? undefined });
  };

  const handleUpdate = (data: CreateCategoryDTO) => {
    if (!editingCategory) return;
    updateMutation.mutate(
      { name: data.name, color: data.color || undefined },
      { onSuccess: () => setEditingCategory(null) }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  if (categoriesState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Categorias
        </Text>
        <Text color="danger">Erro ao carregar categorias: {categoriesState.error}</Text>
      </S.Wrapper>
    );
  }

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Categorias
      </Text>

      <form onSubmit={createForm.handleSubmit(handleCreate)}>
        <S.FormRow>
          <S.FormField>
            <Input
              placeholder="Nome da categoria"
              error={createForm.formState.errors.name?.message}
              {...createForm.register("name")}
            />
          </S.FormField>
          <Button type="submit" loading={createMutation.isPending} disabled={!createForm.formState.isValid}>
            Criar
          </Button>
        </S.FormRow>
      </form>

      {categoriesState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
        </S.List>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={<HiOutlineTag />}
          title="Nenhuma categoria"
          description="Crie sua primeira categoria para organizar suas transações."
        />
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.Item key={cat.id}>
              <S.CategoryBadge $color={cat.color ?? undefined}>
                {cat.name}
              </S.CategoryBadge>
              <S.Actions>
                <S.IconButton onClick={() => handleEdit(cat)} aria-label="Editar">
                  <HiOutlinePencil size={16} />
                </S.IconButton>
                <S.IconButton onClick={() => setDeletingCategory(cat)} aria-label="Excluir">
                  <HiOutlineTrash size={16} />
                </S.IconButton>
              </S.Actions>
            </S.Item>
          ))}
        </S.List>
      )}

      <Modal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Editar Categoria"
      >
        <form onSubmit={editForm.handleSubmit(handleUpdate)}>
          <S.ModalForm>
            <S.FormGroup>
              <S.Label>Nome</S.Label>
              <Input
                error={editForm.formState.errors.name?.message}
                {...editForm.register("name")}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Cor (hex)</S.Label>
              <Input
                placeholder="#4F46E5"
                error={editForm.formState.errors.color?.message}
                {...editForm.register("color")}
              />
            </S.FormGroup>
            <S.ModalActions>
              <Button variant="outline" onClick={() => setEditingCategory(null)} type="button">
                Cancelar
              </Button>
              <Button type="submit" loading={updateMutation.isPending}>
                Salvar
              </Button>
            </S.ModalActions>
          </S.ModalForm>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Categoria"
        message={`Tem certeza que deseja excluir a categoria "${deletingCategory?.name}"? Transações associadas perderão a referência de categoria.`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}

"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { CategoryForm } from "@/components/molecules/CategoryForm";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";
import type { Category } from "@/types";
import * as S from "./style";

export default function CategoriasPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const categoriesState = useCategories();
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();
  const updateMutation = useUpdateCategory(editingCategory?.id ?? "");

  const handleCreate = (data: { name: string; color?: string; icon?: string }) => {
    createMutation.mutate(
      { name: data.name },
      { onSuccess: () => {} }
    );
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
  };

  const handleUpdate = (data: { name: string; color?: string; icon?: string }) => {
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

      <CategoryForm
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Criar"
      />

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
        <CategoryForm
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={editingCategory ? { name: editingCategory.name, color: editingCategory.color ?? undefined } : undefined}
          onCancel={() => setEditingCategory(null)}
        />
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

"use client";

import { useState } from "react";
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
import type { Category } from "@/types";
import * as S from "./style";

export default function CategoriasPage() {
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const categoriesState = useCategories();
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();
  const updateMutation = useUpdateCategory(editingCategory?.id ?? "");

  const handleCreate = () => {
    if (!name.trim()) return;
    createMutation.mutate(
      { name: name.trim() },
      { onSuccess: () => setName("") }
    );
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditColor(cat.color ?? "");
  };

  const handleUpdate = () => {
    if (!editName.trim() || !editingCategory) return;
    updateMutation.mutate(
      { name: editName.trim(), color: editColor || undefined },
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

      <S.FormRow>
        <S.FormField>
          <Input
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </S.FormField>
        <Button onClick={handleCreate} loading={createMutation.isPending} disabled={!name.trim()}>
          Criar
        </Button>
      </S.FormRow>

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
        <S.ModalForm>
          <S.FormGroup>
            <S.Label>Nome</S.Label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Cor (hex)</S.Label>
            <Input
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              placeholder="#4F46E5"
            />
          </S.FormGroup>
          <S.ModalActions>
            <Button variant="outline" onClick={() => setEditingCategory(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} loading={updateMutation.isPending}>
              Salvar
            </Button>
          </S.ModalActions>
        </S.ModalForm>
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

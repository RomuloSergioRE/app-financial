"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import {
  useGlobalCategories,
  useCreateGlobalCategory,
  useUpdateGlobalCategory,
  useDeleteGlobalCategory,
} from "@/hooks/useAdmin";
import type { GlobalCategory } from "@/types";
import * as S from "./style";

export default function AdminCategoriasGlobaisPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GlobalCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<GlobalCategory | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const categoriesState = useGlobalCategories();
  const createMutation = useCreateGlobalCategory();
  const updateMutation = useUpdateGlobalCategory();
  const deleteMutation = useDeleteGlobalCategory();

  const categories = categoriesState.status === "success" ? categoriesState.data : [];

  const resetForm = () => {
    setName("");
    setColor("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate(
      { name: name.trim(), color: color || undefined },
      {
        onSuccess: () => {
          resetForm();
          setShowCreate(false);
        },
      },
    );
  };

  const handleEdit = (cat: GlobalCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setColor(cat.color ?? "");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !name.trim()) return;
    updateMutation.mutate(
      { id: editingCategory.id, data: { name: name.trim(), color: color || undefined } },
      {
        onSuccess: () => {
          resetForm();
          setEditingCategory(null);
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Categorias Globais
      </Text>

      <S.Section>
        <S.Row>
          <Text as="h2" size="lg" weight="semibold" fontFamily="display">
            Todas as Categorias
          </Text>
          <Button
            onClick={() => {
              resetForm();
              setShowCreate(true);
            }}
          >
            <HiOutlinePlus size={16} /> Nova
          </Button>
        </S.Row>
      </S.Section>

      {categoriesState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
        </S.List>
      ) : categories.length === 0 ? (
        <EmptyState
          title="Nenhuma categoria global"
          description="Crie categorias que estarão disponíveis para todos os usuários."
        />
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.Section key={cat.id}>
              <S.Row>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {cat.color && (
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Text size="md" weight="medium">
                    {cat.name}
                  </Text>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <S.IconButton onClick={() => handleEdit(cat)} title="Editar">
                    <HiOutlinePencil size={16} />
                  </S.IconButton>
                  <S.IconButton onClick={() => setDeletingCategory(cat)} title="Excluir">
                    <HiOutlineTrash size={16} />
                  </S.IconButton>
                </div>
              </S.Row>
            </S.Section>
          ))}
        </S.List>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Nova Categoria Global">
        <S.Form onSubmit={handleCreate}>
          <S.Field>
            <S.Label>Nome</S.Label>
            <S.Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </S.Field>
          <S.Field>
            <S.Label>Cor (hex)</S.Label>
            <S.Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#3B82F6"
            />
          </S.Field>
          <Button type="submit" loading={createMutation.isPending}>
            Criar
          </Button>
        </S.Form>
      </Modal>

      <Modal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Editar Categoria Global"
      >
        <S.Form onSubmit={handleUpdate}>
          <S.Field>
            <S.Label>Nome</S.Label>
            <S.Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </S.Field>
          <S.Field>
            <S.Label>Cor (hex)</S.Label>
            <S.Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#3B82F6"
            />
          </S.Field>
          <Button type="submit" loading={updateMutation.isPending}>
            Salvar
          </Button>
        </S.Form>
      </Modal>

      <ConfirmDialog
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Categoria"
        message={`Tem certeza que deseja excluir "${deletingCategory?.name}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}

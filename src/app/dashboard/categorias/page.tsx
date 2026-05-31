"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
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

  const { data, isLoading } = useCategories();
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

  const categories = data?.data?.data ?? [];

  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Categorias</Text>

      <S.FormRow>
        <S.FormField>
          <Input
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </S.FormField>
        <Button onClick={handleCreate} loading={createMutation.isPending}>
          Criar
        </Button>
      </S.FormRow>

      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.Item key={cat.id}>
              <S.CategoryBadge $color={cat.color ?? undefined}>
                {cat.name}
              </S.CategoryBadge>
              <S.Actions>
                <Button variant="text" onClick={() => handleEdit(cat)}>
                  <HiOutlinePencil size={16} />
                </Button>
                <Button
                  variant="text"
                  onClick={() => deleteMutation.mutate(cat.id)}
                >
                  <HiOutlineTrash size={16} />
                </Button>
              </S.Actions>
            </S.Item>
          ))}
        </S.List>
      )}

      {editingCategory && (
        <S.Overlay onClick={() => setEditingCategory(null)} />
      )}

      {editingCategory && (
        <S.Modal>
          <Text as="h2" size="lg" weight="bold">Editar Categoria</Text>
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
        </S.Modal>
      )}
    </S.Wrapper>
  );
}

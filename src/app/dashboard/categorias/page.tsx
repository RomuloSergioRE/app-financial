"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { categoryService } from "@/services/categories";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import type { CreateCategoryRequest } from "@/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: end;
  flex-wrap: wrap;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CategoryBadge = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $color }) => $color || "#4F46E5"};
  }
`;

const TypeTag = styled.span<{ $type: string }>`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  background: ${({ theme, $type }) =>
    $type === "income"
      ? theme.colors.secondary + "20"
      : $type === "expense"
      ? theme.colors.danger + "20"
      : theme.colors.primary + "20"};
  color: ${({ theme, $type }) =>
    $type === "income"
      ? theme.colors.secondary
      : $type === "expense"
      ? theme.colors.danger
      : theme.colors.primary};
`;

export default function CategoriasPage() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setName("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleCreate = () => {
    if (!name.trim()) return;
    createMutation.mutate({ name: name.trim(), type: "both" });
  };

  const categories = data?.data?.data ?? [];

  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Categorias</Text>

      <Form>
        <Input
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <Button onClick={handleCreate} loading={createMutation.isPending}>
          Criar
        </Button>
      </Form>

      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <List>
          {categories.map((cat) => (
            <Item key={cat.id}>
              <CategoryBadge $color={cat.color}>
                {cat.name}
              </CategoryBadge>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <TypeTag $type={cat.type}>
                  {cat.type === "income" ? "Receita" : cat.type === "expense" ? "Despesa" : "Ambos"}
                </TypeTag>
                <Button
                  variant="text"
                  onClick={() => deleteMutation.mutate(cat.id)}
                >
                  ✕
                </Button>
              </div>
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

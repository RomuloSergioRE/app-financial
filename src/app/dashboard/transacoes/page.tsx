"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { transactionService } from "@/services/transactions";
import { categoryService } from "@/services/categories";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import type { CreateTransactionRequest } from "@/types";

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
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Select = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TypeBadge = styled.span<{ $type: string }>`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background: ${({ theme, $type }) =>
    $type === "income" ? theme.colors.secondary + "20" : theme.colors.danger + "20"};
  color: ${({ theme, $type }) =>
    $type === "income" ? theme.colors.secondary : theme.colors.danger};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export default function TransacoesPage() {
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => transactionService.list(page),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      transactionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      setDescription("");
      setAmount("");
      setCategoryId("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });

  const handleCreate = () => {
    if (!description.trim() || !amount || !categoryId) return;
    createMutation.mutate({
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split("T")[0],
      categoryId: parseInt(categoryId),
    });
  };

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const categories = categoriesData?.data?.data ?? [];

  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Transações</Text>

      <Form>
        <FormGroup>
          <Label>Descrição</Label>
          <Input
            placeholder="Ex: Supermercado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Valor</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tipo</Label>
          <Select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
            <option value="expense">Saída</option>
            <option value="income">Entrada</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Categoria</Label>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Selecione</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button
          onClick={handleCreate}
          loading={createMutation.isPending}
          disabled={!description.trim() || !amount || !categoryId}
        >
          Adicionar
        </Button>
      </Form>

      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Data</Th>
                  <Th>Descrição</Th>
                  <Th>Categoria</Th>
                  <Th>Tipo</Th>
                  <Th>Valor</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <Td>{new Date(tx.date).toLocaleDateString("pt-BR")}</Td>
                    <Td>{tx.description}</Td>
                    <Td>{tx.category?.name ?? "-"}</Td>
                    <Td>
                      <TypeBadge $type={tx.type}>
                        {tx.type === "income" ? "Entrada" : "Saída"}
                      </TypeBadge>
                    </Td>
                    <Td>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(tx.amount)}
                    </Td>
                    <Td>
                      <Button
                        variant="text"
                        onClick={() => deleteMutation.mutate(tx.id)}
                      >
                        ✕
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          {totalPages > 1 && (
            <Pagination>
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              <Text size="sm">
                {page} de {totalPages}
              </Text>
              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Próximo
              </Button>
            </Pagination>
          )}
        </>
      )}
    </Wrapper>
  );
}

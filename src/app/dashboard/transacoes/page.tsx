"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { useCategories } from "@/hooks/useCategories";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";
import type { Transaction } from "@/types";
import * as S from "./style";

export default function TransacoesPage() {
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "outcome">("outcome");
  const [categoryId, setCategoryId] = useState("");
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState<"income" | "outcome">("outcome");
  const [editCategoryId, setEditCategoryId] = useState("");

  const { data, isLoading } = useTransactions(page);
  const { data: categoriesData } = useCategories();
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();
  const updateMutation = useUpdateTransaction(editingTx?.id ?? "");

  const handleCreate = () => {
    if (!description.trim() || !amount || !categoryId || parseFloat(amount) <= 0) return;
    createMutation.mutate(
      {
        description: description.trim(),
        amount: Math.round(parseFloat(amount) * 100),
        type,
        date: new Date().toISOString(),
        categoryId,
      },
      {
        onSuccess: () => {
          setDescription("");
          setAmount("");
          setCategoryId("");
        },
      }
    );
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setEditDescription(tx.description);
    setEditAmount((tx.amount / 100).toString());
    setEditType(tx.type);
    setEditCategoryId(tx.categoryId.toString());
  };

  const handleUpdate = () => {
    if (!editDescription.trim() || !editAmount || !editingTx) return;
    updateMutation.mutate(
      {
        description: editDescription.trim(),
        amount: Math.round(parseFloat(editAmount) * 100),
        type: editType,
        categoryId: editCategoryId,
      },
      { onSuccess: () => setEditingTx(null) }
    );
  };

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const categories = categoriesData?.data?.data ?? [];

  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Transações</Text>

      <S.Form>
        <S.FormGroup>
          <S.Label>Descrição</S.Label>
          <Input
            placeholder="Ex: Supermercado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Valor</S.Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || parseFloat(val) >= 0) setAmount(val);
            }}
          />
        </S.FormGroup>
        <S.FormRow>
          <S.FormGroup>
            <S.Label>Tipo</S.Label>
            <Select
              value={type}
              onChange={(v) => setType(v as "income" | "outcome")}
              options={[
                { value: "outcome", label: "Saída" },
                { value: "income", label: "Entrada" },
              ]}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Categoria</S.Label>
            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={[
                { value: "", label: "Selecione" },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </S.FormGroup>
        </S.FormRow>
        <Button
          onClick={handleCreate}
          loading={createMutation.isPending}
          disabled={!description.trim() || !amount || !categoryId}
        >
          Adicionar
        </Button>
      </S.Form>

      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <S.TableWrapper>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>Data</S.Th>
                  <S.Th>Descrição</S.Th>
                  <S.Th>Categoria</S.Th>
                  <S.Th>Tipo</S.Th>
                  <S.Th>Valor</S.Th>
                  <S.Th></S.Th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  return (
                    <tr key={tx.id}>
                      <S.Td>{new Date(tx.date).toLocaleDateString("pt-BR")}</S.Td>
                      <S.Td>{tx.description}</S.Td>
                      <S.Td>{tx.category?.name ?? "-"}</S.Td>
                      <S.Td>
                        <S.TypeBadge $type={tx.type}>
                          {tx.type === "income" ? "Entrada" : "Saída"}
                        </S.TypeBadge>
                      </S.Td>
                      <S.TdMono>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(tx.amount / 100)}
                      </S.TdMono>
                      <S.Td>
                        <S.Actions>
                          <Button variant="ghost" onClick={() => handleEdit(tx)}>
                            <HiOutlinePencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => deleteMutation.mutate(tx.id)}
                          >
                            <HiOutlineTrash size={16} />
                          </Button>
                        </S.Actions>
                      </S.Td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </S.TableWrapper>

          {totalPages > 1 && (
            <S.Pagination>
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
            </S.Pagination>
          )}
        </>
      )}

      {editingTx && (
        <S.Overlay onClick={() => setEditingTx(null)} />
      )}

      {editingTx && (
        <S.Modal>
          <Text as="h2" size="lg" weight="bold">Editar Transação</Text>
          <S.ModalForm>
            <S.FormGroup>
              <S.Label>Descrição</S.Label>
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Valor</S.Label>
              <Input
                type="number"
                step="0.01"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Tipo</S.Label>
              <Select
                value={editType}
                onChange={(v) => setEditType(v as "income" | "outcome")}
                options={[
                  { value: "outcome", label: "Saída" },
                  { value: "income", label: "Entrada" },
                ]}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Categoria</S.Label>
              <Select
                value={editCategoryId}
                onChange={setEditCategoryId}
                options={[
                  { value: "", label: "Selecione" },
                  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                ]}
              />
            </S.FormGroup>
            <S.ModalActions>
              <Button variant="outline" onClick={() => setEditingTx(null)}>
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

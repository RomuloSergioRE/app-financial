"use client";

import Link from "next/link";
import { Text } from "@/components/atoms/Text";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents } from "@/lib/currency";
import * as S from "./style";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "outcome";
  category?: { name: string } | null;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) return null;

  return (
    <S.Section>
      <S.Header>
        <Text as="h2" size="lg" weight="semibold" fontFamily="display">
          Últimas Transações
        </Text>
        <Link href="/transacoes">
          <S.Link>Ver todas</S.Link>
        </Link>
      </S.Header>
      <S.List>
        <S.Table>
          <thead>
            <tr>
              <S.Th>Data</S.Th>
              <S.Th>Descrição</S.Th>
              <S.Th>Categoria</S.Th>
              <S.Th>Tipo</S.Th>
              <S.Th>Valor</S.Th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <S.Td data-label="Data">{formatDate(tx.date)}</S.Td>
                <S.Td data-label="Descrição">{tx.description}</S.Td>
                <S.Td data-label="Categoria">{tx.category?.name ?? "-"}</S.Td>
                <S.Td data-label="Tipo">
                  <S.TypeBadge $type={tx.type}>
                    {tx.type === "income" ? "Entrada" : "Saída"}
                  </S.TypeBadge>
                </S.Td>
                <S.TdMono data-label="Valor">{formatCurrency(fromCents(tx.amount))}</S.TdMono>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.List>
    </S.Section>
  );
}

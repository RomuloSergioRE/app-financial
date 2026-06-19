"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Text } from "@/components/atoms/Text";
import { useAuth } from "@/contexts/AuthContext";
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
  const { currency } = useAuth();
  const locale = useLocale();
  const dt = useTranslations("dashboard");
  const tt = useTranslations("transactions");

  if (transactions.length === 0) return null;

  return (
    <S.Section>
      <S.Header>
        <Text as="h2" size="lg" weight="semibold" fontFamily="display">
          {dt("ultimasTransacoes")}
        </Text>
        <Link href="/transactions">
          <S.Link>{dt("verTodas")}</S.Link>
        </Link>
      </S.Header>
      <S.List>
        <S.Table>
          <thead>
            <tr>
              <S.Th>{tt("data")}</S.Th>
              <S.Th>{tt("descricao")}</S.Th>
              <S.Th>{tt("categoria")}</S.Th>
              <S.Th>{tt("tipo")}</S.Th>
              <S.Th>{tt("valor")}</S.Th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <S.Td data-label={tt("data")}>{formatDate(tx.date, locale)}</S.Td>
                <S.Td data-label={tt("descricao")}>{tx.description}</S.Td>
                <S.Td data-label={tt("categoria")}>{tx.category?.name ?? "-"}</S.Td>
                <S.Td data-label={tt("tipo")}>
                  <S.TypeBadge $type={tx.type}>
                    {tx.type === "income" ? dt("receitas") : dt("despesas")}
                  </S.TypeBadge>
                </S.Td>
                <S.TdMono data-label={tt("valor")}>{formatCurrency(fromCents(tx.amount), currency, locale)}</S.TdMono>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.List>
    </S.Section>
  );
}

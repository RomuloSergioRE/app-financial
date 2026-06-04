"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Text } from "@/components/atoms/Text";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineWallet,
} from "react-icons/hi2";
import { useBalance, useCategoriesAnalytics, getDateRange } from "@/hooks/useAnalytics";
import { useTransactions } from "@/hooks/useTransactions";
import type { Period } from "@/components/molecules/PeriodFilter/types";
import * as S from "./style";

const currencyFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormat = new Intl.DateTimeFormat("pt-BR");

const incomeIcon = <HiOutlineArrowTrendingUp size={20} />;
const outcomeIcon = <HiOutlineArrowTrendingDown size={20} />;
const walletIcon = <HiOutlineWallet size={20} />;

const BalanceChart = dynamic(
  () => import("@/components/molecules/BalanceChart").then((m) => m.BalanceChart),
  { ssr: false, loading: () => <Skeleton variant="rect" height="300px" /> }
);
const PieChart = dynamic(
  () => import("@/components/molecules/PieChart").then((m) => m.PieChart),
  { ssr: false, loading: () => <Skeleton variant="rect" height="300px" /> }
);

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("month");
  const { startDate, endDate } = getDateRange(period);

  const balanceState = useBalance(startDate, endDate);
  const categoriesState = useCategoriesAnalytics(startDate, endDate);
  const recentState = useTransactions(1, 5);

  const currentStart = new Date(startDate);
  const currentEnd = new Date(endDate);
  const durationMs = currentEnd.getTime() - currentStart.getTime();
  const prevStart = new Date(currentStart.getTime() - durationMs).toISOString().split("T")[0];
  const prevEnd = currentStart.toISOString().split("T")[0];

  const prevBalanceState = useBalance(prevStart, prevEnd);

  const balanceLoading = balanceState.status === "loading";
  const categoriesLoading = categoriesState.status === "loading";

  const rawBalance = balanceState.status === "success" ? balanceState.data : undefined;
  const prevRawBalance = prevBalanceState.status === "success" ? prevBalanceState.data : undefined;

  const balance = rawBalance
    ? {
        totalIncome: rawBalance.totalIncome / 100,
        totalOutcome: rawBalance.totalOutcome / 100,
        netBalance: rawBalance.netBalance / 100,
      }
    : undefined;

  const calcChange = (current: number, previous?: number) => {
    if (previous === undefined || previous === null) return undefined;
    if (previous === 0 && current > 0) return 100;
    if (previous === 0 && current === 0) return undefined;

    if (previous < 0) {
      if (current >= 0) return 100;
      return ((Math.abs(previous) - Math.abs(current)) / Math.abs(previous)) * 100;
    }

    return ((current - previous) / previous) * 100;
  };

  const incomeChange = rawBalance ? calcChange(rawBalance.totalIncome, prevRawBalance?.totalIncome) : undefined;
  const outcomeChange = rawBalance ? calcChange(rawBalance.totalOutcome, prevRawBalance?.totalOutcome) : undefined;
  const netChange = rawBalance ? calcChange(rawBalance.netBalance, prevRawBalance?.netBalance) : undefined;

  const categories = useMemo(
    () => (categoriesState.status === "success" ? categoriesState.data : []).map((c) => ({
      ...c,
      totalAmount: c.totalAmount / 100,
    })),
    [categoriesState]
  );
  const recentTransactions = recentState.status === "success" ? recentState.data.data : [];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Dashboard</S.Title>
        <S.HeaderActions>
          <PeriodFilter value={period} onChange={setPeriod} />
        </S.HeaderActions>
      </S.Header>

      <S.Cards>
        {balanceLoading ? (
          <>
            <Skeleton variant="rect" height="80px" />
            <Skeleton variant="rect" height="80px" />
            <Skeleton variant="rect" height="80px" />
          </>
        ) : (
          <>
            <SummaryCard
              label="Receitas"
              value={balance?.totalIncome ?? 0}
              icon={incomeIcon}
              type="income"
              change={incomeChange}
            />
            <SummaryCard
              label="Despesas"
              value={balance?.totalOutcome ?? 0}
              icon={outcomeIcon}
              type="outcome"
              change={outcomeChange}
            />
            <SummaryCard
              label="Saldo"
              value={balance?.netBalance ?? 0}
              icon={walletIcon}
              type="balance"
              change={netChange}
            />
          </>
        )}
      </S.Cards>

      <S.Charts>
        {balanceLoading ? (
          <Skeleton variant="rect" height="300px" />
        ) : (
          <BalanceChart
            income={balance?.totalIncome ?? 0}
            expense={balance?.totalOutcome ?? 0}
            netBalance={balance?.netBalance ?? 0}
          />
        )}
        {categoriesLoading ? (
          <Skeleton variant="rect" height="300px" />
        ) : (
          <PieChart categories={categories ?? []} />
        )}
      </S.Charts>

      {recentTransactions.length > 0 && (
        <S.RecentSection>
          <S.RecentHeader>
            <Text as="h2" size="lg" weight="semibold" fontFamily="display">
              Últimas Transações
            </Text>
            <Link href="/dashboard/transacoes">
              <S.RecentLink>Ver todas</S.RecentLink>
            </Link>
          </S.RecentHeader>
          <S.RecentList>
            <S.RecentTable>
              <thead>
                <tr>
                  <S.RecentTh>Data</S.RecentTh>
                  <S.RecentTh>Descrição</S.RecentTh>
                  <S.RecentTh>Categoria</S.RecentTh>
                  <S.RecentTh>Tipo</S.RecentTh>
                  <S.RecentTh>Valor</S.RecentTh>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <S.RecentTd>{dateFormat.format(new Date(tx.date))}</S.RecentTd>
                    <S.RecentTd>{tx.description}</S.RecentTd>
                    <S.RecentTd>{tx.category?.name ?? "-"}</S.RecentTd>
                    <S.RecentTd>
                      <S.RecentTypeBadge $type={tx.type}>
                        {tx.type === "income" ? "Entrada" : "Saída"}
                      </S.RecentTypeBadge>
                    </S.RecentTd>
                    <S.RecentTdMono>
                      {currencyFormat.format(tx.amount / 100)}
                    </S.RecentTdMono>
                  </tr>
                ))}
              </tbody>
            </S.RecentTable>
          </S.RecentList>
        </S.RecentSection>
      )}
    </S.Wrapper>
  );
}

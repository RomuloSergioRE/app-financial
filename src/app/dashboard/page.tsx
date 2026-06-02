"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
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

  const { data: balanceData, isLoading: balanceLoading } = useBalance(startDate, endDate);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesAnalytics(startDate, endDate);
  const { data: recentData } = useTransactions(1, 5);

  const rawBalance = balanceData?.data;
  const balance = rawBalance
    ? {
        totalIncome: rawBalance.totalIncome / 100,
        totalOutcome: rawBalance.totalOutcome / 100,
        netBalance: rawBalance.netBalance / 100,
      }
    : undefined;
  const categories = (categoriesData?.data ?? []).map((c) => ({
    ...c,
    totalAmount: c.totalAmount / 100,
  }));
  const recentTransactions = recentData?.data?.data ?? [];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Dashboard</S.Title>
        <S.HeaderActions>
          <PeriodFilter value={period} onChange={setPeriod} />
          <ThemeToggle />
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
              icon={<HiOutlineArrowTrendingUp size={20} />}
              type="income"
            />
            <SummaryCard
              label="Despesas"
              value={balance?.totalOutcome ?? 0}
              icon={<HiOutlineArrowTrendingDown size={20} />}
              type="outcome"
            />
            <SummaryCard
              label="Saldo"
              value={balance?.netBalance ?? 0}
              icon={<HiOutlineWallet size={20} />}
              type="balance"
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
            <Link href="/dashboard/transacoes" passHref legacyBehavior>
              <S.RecentLink>Ver todas</S.RecentLink>
            </Link>
          </S.RecentHeader>
          <S.RecentList>
            {recentTransactions.map((tx) => (
              <S.RecentItem key={tx.id}>
                <S.RecentDesc>{tx.description}</S.RecentDesc>
                <S.RecentType $type={tx.type}>
                  {tx.type === "income" ? "Entrada" : "Saída"}
                </S.RecentType>
                <S.RecentCategory>
                  {tx.category?.name ?? "-"}
                </S.RecentCategory>
                <S.RecentValue $type={tx.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(tx.amount / 100)}
                </S.RecentValue>
                <S.RecentDate>
                  {new Date(tx.date).toLocaleDateString("pt-BR")}
                </S.RecentDate>
              </S.RecentItem>
            ))}
          </S.RecentList>
        </S.RecentSection>
      )}
    </S.Wrapper>
  );
}

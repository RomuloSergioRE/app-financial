"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";

const BarChart = dynamic(
  () => import("@/components/molecules/BarChart").then((m) => m.BarChart),
  { ssr: false, loading: () => <p>Carregando gráfico...</p> }
);
const PieChart = dynamic(
  () => import("@/components/molecules/PieChart").then((m) => m.PieChart),
  { ssr: false, loading: () => <p>Carregando gráfico...</p> }
);
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineWallet,
} from "react-icons/hi2";
import { useBalance, useCategoriesAnalytics, getDateRange } from "@/hooks/useAnalytics";
import type { Period } from "@/components/molecules/PeriodFilter/types";
import * as S from "./style";

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("month");
  const { startDate, endDate } = getDateRange(period);

  const { data: balanceData, isLoading: balanceLoading } = useBalance(startDate, endDate);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesAnalytics(startDate, endDate);

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

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Dashboard</S.Title>
        <PeriodFilter value={period} onChange={setPeriod} />
      </S.Header>

      <S.Cards>
        <SummaryCard
          label="Receitas"
          value={balance?.totalIncome ?? 0}
          icon={<HiOutlineArrowTrendingUp size={24} />}
          color="secondary"
        />
        <SummaryCard
          label="Despesas"
          value={balance?.totalOutcome ?? 0}
          icon={<HiOutlineArrowTrendingDown size={24} />}
          color="danger"
        />
        <SummaryCard
          label="Saldo"
          value={balance?.netBalance ?? 0}
          icon={<HiOutlineWallet size={24} />}
          color="primary"
        />
      </S.Cards>

      <S.Charts>
        {balanceLoading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <BarChart
            income={balance?.totalIncome ?? 0}
            expense={balance?.totalOutcome ?? 0}
          />
        )}
        {categoriesLoading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <PieChart categories={categories ?? []} />
        )}
      </S.Charts>
    </S.Wrapper>
  );
}

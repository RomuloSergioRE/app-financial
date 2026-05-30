"use client";

import { useState } from "react";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";
import { BarChart } from "@/components/molecules/BarChart";
import { PieChart } from "@/components/molecules/PieChart";
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

  const balance = balanceData?.data;
  const categories = categoriesData?.data;

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

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Skeleton } from "@/components/atoms/Skeleton";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineWallet,
} from "react-icons/hi2";
import { useBalance, useCategoriesAnalytics, getDateRange } from "@/hooks/useAnalytics";
import type { Period } from "@/components/molecules/PeriodFilter/types";
import * as S from "./style";

const BarChart = dynamic(
  () => import("@/components/molecules/BarChart").then((m) => m.BarChart),
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
        <S.HeaderActions>
          <PeriodFilter value={period} onChange={setPeriod} />
          <ThemeToggle />
        </S.HeaderActions>
      </S.Header>

      <S.Cards>
        {balanceLoading ? (
          <>
            <Skeleton variant="rect" height="120px" />
            <Skeleton variant="rect" height="120px" />
            <Skeleton variant="rect" height="120px" />
          </>
        ) : (
          <>
            <SummaryCard
              label="Receitas"
              value={balance?.totalIncome ?? 0}
              icon={<HiOutlineArrowTrendingUp size={20} />}
              type="income"
              index={0}
            />
            <SummaryCard
              label="Despesas"
              value={balance?.totalOutcome ?? 0}
              icon={<HiOutlineArrowTrendingDown size={20} />}
              type="outcome"
              index={1}
            />
            <SummaryCard
              label="Saldo"
              value={balance?.netBalance ?? 0}
              icon={<HiOutlineWallet size={20} />}
              type="balance"
              index={2}
            />
          </>
        )}
      </S.Cards>

      <S.Charts>
        {balanceLoading ? (
          <Skeleton variant="rect" height="300px" />
        ) : (
          <BarChart
            income={balance?.totalIncome ?? 0}
            expense={balance?.totalOutcome ?? 0}
          />
        )}
        {categoriesLoading ? (
          <Skeleton variant="rect" height="300px" />
        ) : (
          <PieChart categories={categories ?? []} />
        )}
      </S.Charts>
    </S.Wrapper>
  );
}

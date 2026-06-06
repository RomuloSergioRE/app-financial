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
  HiOutlineDocumentArrowDown,
} from "react-icons/hi2";
import {
  useBalance,
  useCategoriesAnalytics,
  useMonthlySeries,
  useTopCategories,
  useComparison,
  useExportCsv,
  useExportPdf,
} from "@/hooks/useAnalytics";
import { getDateRange } from "@/lib/date";
import { calcChange } from "@/lib/analytics";
import { useTransactions } from "@/hooks/useTransactions";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents } from "@/lib/currency";
import type { Period } from "@/components/molecules/PeriodFilter/types";
import * as S from "./style";

const incomeIcon = <HiOutlineArrowTrendingUp size={20} />;
const outcomeIcon = <HiOutlineArrowTrendingDown size={20} />;
const walletIcon = <HiOutlineWallet size={20} />;

const BalanceChart = dynamic(
  () => import("@/components/molecules/BalanceChart").then((m) => m.BalanceChart),
  { ssr: false, loading: () => <Skeleton variant="rect" height="300px" /> },
);
const PieChart = dynamic(() => import("@/components/molecules/PieChart").then((m) => m.PieChart), {
  ssr: false,
  loading: () => <Skeleton variant="rect" height="300px" />,
});
const MonthlySeriesChart = dynamic(
  () => import("@/components/molecules/MonthlySeriesChart").then((m) => m.MonthlySeriesChart),
  { ssr: false, loading: () => <Skeleton variant="rect" height="300px" /> },
);
const TopCategoriesChart = dynamic(
  () => import("@/components/molecules/TopCategoriesChart").then((m) => m.TopCategoriesChart),
  { ssr: false, loading: () => <Skeleton variant="rect" height="300px" /> },
);
const ComparisonSummary = dynamic(
  () => import("@/components/molecules/ComparisonSummary").then((m) => m.ComparisonSummary),
  { ssr: false, loading: () => <Skeleton variant="rect" height="120px" /> },
);

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("month");
  const { startDate, endDate } = getDateRange(period);

  const balanceState = useBalance(startDate, endDate);
  const categoriesState = useCategoriesAnalytics(startDate, endDate);
  const recentState = useTransactions({ page: 1, limit: 5 });

  const currentStart = new Date(startDate);
  const currentEnd = new Date(endDate);
  const durationMs = currentEnd.getTime() - currentStart.getTime();
  const prevStart = new Date(currentStart.getTime() - durationMs).toISOString().split("T")[0];
  const prevEnd = currentStart.toISOString().split("T")[0];

  const prevBalanceState = useBalance(prevStart, prevEnd);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const yearStart = `${currentYear}-01-01`;
  const today = now.toISOString().split("T")[0];

  const monthlySeriesState = useMonthlySeries(yearStart, today);
  const topCategoriesState = useTopCategories(startDate, endDate, 8);
  const comparisonState = useComparison(currentMonth, currentYear);

  const csvExport = useExportCsv();
  const pdfExport = useExportPdf();

  const balanceLoading = balanceState.status === "loading";
  const categoriesLoading = categoriesState.status === "loading";

  const rawBalance = balanceState.status === "success" ? balanceState.data : undefined;
  const prevRawBalance = prevBalanceState.status === "success" ? prevBalanceState.data : undefined;

  const balance = rawBalance
    ? {
        totalIncome: fromCents(rawBalance.totalIncome),
        totalOutcome: fromCents(rawBalance.totalOutcome),
        netBalance: fromCents(rawBalance.netBalance),
      }
    : undefined;

  const incomeChange = rawBalance
    ? calcChange(rawBalance.totalIncome, prevRawBalance?.totalIncome)
    : undefined;
  const outcomeChange = rawBalance
    ? calcChange(rawBalance.totalOutcome, prevRawBalance?.totalOutcome)
    : undefined;
  const netChange = rawBalance
    ? calcChange(rawBalance.netBalance, prevRawBalance?.netBalance)
    : undefined;

  const categories = useMemo(
    () =>
      (categoriesState.status === "success" ? categoriesState.data : []).map((c) => ({
        ...c,
        totalAmount: fromCents(c.totalAmount),
      })),
    [categoriesState],
  );

  const monthlySeriesData = useMemo(
    () =>
      (monthlySeriesState.status === "success" ? monthlySeriesState.data : []).map((m) => ({
        ...m,
        totalIncome: fromCents(m.totalIncome),
        totalOutcome: fromCents(m.totalOutcome),
        netBalance: fromCents(m.netBalance),
      })),
    [monthlySeriesState],
  );

  const topCategoriesData = useMemo(
    () =>
      (topCategoriesState.status === "success" ? topCategoriesState.data : []).map((c) => ({
        ...c,
        totalAmount: fromCents(c.totalAmount),
      })),
    [topCategoriesState],
  );

  const comparison = comparisonState.status === "success" ? comparisonState.data : undefined;

  const recentTransactions = recentState.status === "success" ? recentState.data.data : [];

  const handleExportCsv = () => {
    csvExport.mutate({ startDate, endDate, type: "all" });
  };

  const handleExportPdf = () => {
    pdfExport.mutate({ startDate, endDate });
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Dashboard</S.Title>
        <S.HeaderActions>
          <S.ExportButton onClick={handleExportCsv} disabled={csvExport.isPending}>
            <HiOutlineDocumentArrowDown size={16} />
            CSV
          </S.ExportButton>
          <S.ExportButton onClick={handleExportPdf} disabled={pdfExport.isPending}>
            <HiOutlineDocumentArrowDown size={16} />
            PDF
          </S.ExportButton>
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

      <S.Charts2Col>
        {monthlySeriesState.status === "success" ? (
          <MonthlySeriesChart data={monthlySeriesData} />
        ) : monthlySeriesState.status === "loading" ? (
          <Skeleton variant="rect" height="300px" />
        ) : null}
        {topCategoriesState.status === "success" ? (
          <TopCategoriesChart data={topCategoriesData} />
        ) : topCategoriesState.status === "loading" ? (
          <Skeleton variant="rect" height="300px" />
        ) : null}
      </S.Charts2Col>

      {comparisonState.status === "success" && comparison ? (
        <ComparisonSummary
          currentPeriod="Atual"
          previousPeriod="Anterior"
          currentIncome={fromCents(comparison.current.totalIncome)}
          currentOutcome={fromCents(comparison.current.totalOutcome)}
          currentNet={fromCents(comparison.current.netBalance)}
          incomeChange={comparison.changes.incomeChange}
          outcomeChange={comparison.changes.outcomeChange}
          netChange={comparison.changes.netChange}
        />
      ) : comparisonState.status === "loading" ? (
        <Skeleton variant="rect" height="120px" />
      ) : null}

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
                    <S.RecentTd>{formatDate(tx.date)}</S.RecentTd>
                    <S.RecentTd>{tx.description}</S.RecentTd>
                    <S.RecentTd>{tx.category?.name ?? "-"}</S.RecentTd>
                    <S.RecentTd>
                      <S.RecentTypeBadge $type={tx.type}>
                        {tx.type === "income" ? "Entrada" : "Saída"}
                      </S.RecentTypeBadge>
                    </S.RecentTd>
                    <S.RecentTdMono>{formatCurrency(fromCents(tx.amount))}</S.RecentTdMono>
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

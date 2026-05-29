"use client";

import { useState } from "react";
import styled from "styled-components";
import { SummaryCard } from "@/components/molecules/SummaryCard";
import { PeriodFilter } from "@/components/molecules/PeriodFilter";
import { BarChart } from "@/components/molecules/BarChart";
import { PieChart } from "@/components/molecules/PieChart";
import { useBalance, useCategoriesAnalytics, getDateRange } from "@/hooks/useAnalytics";
import type { Period } from "@/components/molecules/PeriodFilter/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.text};
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Charts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("month");
  const { startDate, endDate } = getDateRange(period);

  const { data: balanceData, isLoading: balanceLoading } = useBalance(startDate, endDate);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesAnalytics(startDate, endDate);

  const balance = balanceData?.data;
  const categories = categoriesData?.data;

  return (
    <Wrapper>
      <Header>
        <Title>Dashboard</Title>
        <PeriodFilter value={period} onChange={setPeriod} />
      </Header>

      <Cards>
        <SummaryCard
          label="Receitas"
          value={balance?.totalIncome ?? 0}
          icon="📈"
          color="secondary"
        />
        <SummaryCard
          label="Despesas"
          value={balance?.totalExpense ?? 0}
          icon="📉"
          color="danger"
        />
        <SummaryCard
          label="Saldo"
          value={balance?.balance ?? 0}
          icon="💰"
          color="primary"
        />
      </Cards>

      <Charts>
        {balanceLoading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <BarChart
            income={balance?.totalIncome ?? 0}
            expense={balance?.totalExpense ?? 0}
          />
        )}
        {categoriesLoading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <PieChart categories={categories?.categories ?? []} />
        )}
      </Charts>
    </Wrapper>
  );
}

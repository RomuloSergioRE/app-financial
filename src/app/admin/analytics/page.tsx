"use client";

import { useMemo } from "react";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useAdminOverview, useUserGrowth, useAdminPerformance } from "@/hooks/useAdmin";
import * as S from "./style";

function OverviewCards() {
  const overviewState = useAdminOverview();

  if (overviewState.status === "loading") {
    return (
      <S.StatsGrid>
        <Skeleton variant="rect" height="100px" />
        <Skeleton variant="rect" height="100px" />
        <Skeleton variant="rect" height="100px" />
        <Skeleton variant="rect" height="100px" />
      </S.StatsGrid>
    );
  }

  if (overviewState.status === "error") {
    return <Text color="danger">{overviewState.error}</Text>;
  }

  const data = overviewState.data;

  return (
    <S.StatsGrid>
      <S.StatCard>
        <S.StatLabel>Total de Usuários</S.StatLabel>
        <S.StatValue>{data.totalUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Usuários Ativos</S.StatLabel>
        <S.StatValue $positive>{data.activeUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Transações</S.StatLabel>
        <S.StatValue>{data.totalTransactions}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Receitas</S.StatLabel>
        <S.StatValue $positive>R$ {(data.totalIncome / 100).toLocaleString("pt-BR")}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Despesas</S.StatLabel>
        <S.StatValue>R$ {(data.totalOutcome / 100).toLocaleString("pt-BR")}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Saldo Líquido</S.StatLabel>
        <S.StatValue $positive={data.netPlatformBalance >= 0}>
          R$ {(data.netPlatformBalance / 100).toLocaleString("pt-BR")}
        </S.StatValue>
      </S.StatCard>
    </S.StatsGrid>
  );
}

function GrowthChart() {
  const today = useMemo(() => new Date(), []);
  const endDate = today.toISOString().split("T")[0];
  const startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const growthQuery = useUserGrowth({ startDate, endDate, granularity: "month" });

  const data = growthQuery.data ?? [];

  if (growthQuery.isPending) {
    return <Skeleton variant="rect" height="200px" />;
  }

  if (data.length === 0) {
    return <Text color="textSecondary">Nenhum dado de crescimento disponível.</Text>;
  }

  const maxNewUsers = Math.max(...data.map((d) => d.newUsers), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {data.map((d) => (
        <div key={d.period} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 60, fontSize: 12, color: "var(--text-secondary, #888)" }}>
            {d.period}
          </span>
          <div
            style={{
              flex: 1,
              height: 20,
              background: "var(--bg-tertiary, #1e1e2e)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(d.newUsers / maxNewUsers) * 100}%`,
                height: "100%",
                background: "var(--color-primary, #3B82F6)",
                borderRadius: 4,
                transition: "width 0.3s",
              }}
            />
          </div>
          <span style={{ width: 30, fontSize: 12, textAlign: "right", color: "var(--text, #fff)" }}>
            {d.newUsers}
          </span>
        </div>
      ))}
    </div>
  );
}

function PerformanceCards() {
  const perfState = useAdminPerformance();

  if (perfState.status === "loading") {
    return <Skeleton variant="rect" height="200px" />;
  }

  if (perfState.status === "error") {
    return <Text color="danger">{perfState.error}</Text>;
  }

  const p = perfState.data;

  return (
    <S.StatsGrid>
      <S.StatCard>
        <S.StatLabel>Total Usuários</S.StatLabel>
        <S.StatValue>{p.totalUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Usuários Ativos</S.StatLabel>
        <S.StatValue $positive>{p.activeUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Transações</S.StatLabel>
        <S.StatValue>{p.totalTransactions}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Logs de Auditoria</S.StatLabel>
        <S.StatValue>{p.totalAuditLogs}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Categorias</S.StatLabel>
        <S.StatValue>{p.totalCategories}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Requisições</S.StatLabel>
        <S.StatValue>{p.totalRequests}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Erros</S.StatLabel>
        <S.StatValue $danger>{p.totalErrors}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Taxa de Erro</S.StatLabel>
        <S.StatValue $danger={p.errorRate > 5}>{p.errorRate.toFixed(2)}%</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>Status do BD</S.StatLabel>
        <S.StatValue $positive={p.dbStatus === "healthy"}>{p.dbStatus}</S.StatValue>
      </S.StatCard>
    </S.StatsGrid>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Analytics
      </Text>

      <S.Section>
        <S.SectionTitle>Visão Geral da Plataforma</S.SectionTitle>
        <OverviewCards />
      </S.Section>

      <S.Section>
        <S.SectionTitle>Crescimento de Usuários (12 meses)</S.SectionTitle>
        <GrowthChart />
      </S.Section>

      <S.Section>
        <S.SectionTitle>Performance do Sistema</S.SectionTitle>
        <PerformanceCards />
      </S.Section>
    </S.Wrapper>
  );
}

"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/format";
import { useAdminOverview, useUserGrowth, useAdminPerformance } from "@/hooks/useAdmin";
import * as S from "./style";

function OverviewCards() {
  const t = useTranslations("admin.analytics");
  const locale = useLocale();
  const { currency } = useAuth();
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
        <S.StatLabel>{t("totalUsuarios")}</S.StatLabel>
        <S.StatValue>{data.totalUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("usuariosAtivos")}</S.StatLabel>
        <S.StatValue $positive>{data.activeUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("transacoes")}</S.StatLabel>
        <S.StatValue>{data.totalTransactions}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("receitas")}</S.StatLabel>
        <S.StatValue $positive>{formatCurrency(data.totalIncome / 100, currency, locale)}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("despesas")}</S.StatLabel>
        <S.StatValue>{formatCurrency(data.totalOutcome / 100, currency, locale)}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("saldoLiquido")}</S.StatLabel>
        <S.StatValue $positive={data.netPlatformBalance >= 0}>
          {formatCurrency(data.netPlatformBalance / 100, currency, locale)}
        </S.StatValue>
      </S.StatCard>
    </S.StatsGrid>
  );
}

function GrowthChart() {
  const t = useTranslations("admin.analytics");
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
    return <Text color="textSecondary">{t("semDados")}</Text>;
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
  const t = useTranslations("admin.analytics");
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
        <S.StatLabel>{t("totalUsuarios")}</S.StatLabel>
        <S.StatValue>{p.totalUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("usuariosAtivos")}</S.StatLabel>
        <S.StatValue $positive>{p.activeUsers}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("transacoes")}</S.StatLabel>
        <S.StatValue>{p.totalTransactions}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("logsAuditoria")}</S.StatLabel>
        <S.StatValue>{p.totalAuditLogs}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("categorias")}</S.StatLabel>
        <S.StatValue>{p.totalCategories}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("requisicoes")}</S.StatLabel>
        <S.StatValue>{p.totalRequests}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("erros")}</S.StatLabel>
        <S.StatValue $danger>{p.totalErrors}</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("taxaErro")}</S.StatLabel>
        <S.StatValue $danger={p.errorRate > 5}>{p.errorRate.toFixed(2)}%</S.StatValue>
      </S.StatCard>
      <S.StatCard>
        <S.StatLabel>{t("statusBD")}</S.StatLabel>
        <S.StatValue $positive={p.dbStatus === "healthy"}>{p.dbStatus}</S.StatValue>
      </S.StatCard>
    </S.StatsGrid>
  );
}

export default function AdminAnalyticsPage() {
  const t = useTranslations("admin.analytics");

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <S.Section>
        <S.SectionTitle>{t("visaoGeral")}</S.SectionTitle>
        <OverviewCards />
      </S.Section>

      <S.Section>
        <S.SectionTitle>{t("crescimentoUsuarios")}</S.SectionTitle>
        <GrowthChart />
      </S.Section>

      <S.Section>
        <S.SectionTitle>{t("performance")}</S.SectionTitle>
        <PerformanceCards />
      </S.Section>
    </S.Wrapper>
  );
}

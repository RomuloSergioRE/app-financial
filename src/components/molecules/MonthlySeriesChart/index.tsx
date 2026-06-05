"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import type { MonthlySeriesChartProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR");

const CustomTooltip = (props: Record<string, unknown>) => {
  const theme = useTheme();
  const active = props.active as boolean | undefined;
  const payload = props.payload as Array<Record<string, unknown>> | undefined;

  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.sm,
        padding: "8px 12px",
        fontSize: 13,
        color: theme.colors.text,
      }}
    >
      {payload.map((d, i) => (
        <div key={i} style={{ color: d.color as string, marginBottom: 2 }}>
          {d.name as string}: {currencyFormatter(Number(d.value))}
        </div>
      ))}
    </div>
  );
};

const formatMonth = (m: string) => {
  const [y, mon] = m.split("-");
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  return `${months[parseInt(mon, 10) - 1]}/${y.slice(2)}`;
};

export const MonthlySeriesChart = memo(function MonthlySeriesChart({ data }: MonthlySeriesChartProps) {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <S.Title>Evolução Mensal</S.Title>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: theme.colors.textSecondary }}
              axisLine={{ stroke: theme.colors.border }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) =>
                "R$" + (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v.toFixed(0))
              }
              tick={{ fontSize: 12, fill: theme.colors.textSecondary }}
              axisLine={{ stroke: theme.colors.border }}
              tickLine={false}
            />
            <Tooltip content={CustomTooltip} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: theme.colors.textSecondary }}
            />
            <Bar
              dataKey="totalIncome"
              name="Receitas"
              fill={theme.colors.tradingUp}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="totalOutcome"
              name="Despesas"
              fill={theme.colors.tradingDown}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
});

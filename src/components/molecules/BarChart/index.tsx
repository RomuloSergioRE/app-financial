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
} from "recharts";
import type { BarChartProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR");

const BarChart = memo(function BarChart({ income, expense }: BarChartProps) {
  const theme = useTheme();

  const CustomTooltip = (props: Record<string, unknown>) => {
    const active = props.active as boolean | undefined;
    const payload = props.payload as Array<Record<string, unknown>> | undefined;
    const label = props.label as string | undefined;

    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 4,
          padding: "8px 12px",
          fontSize: 13,
          color: theme.colors.text,
        }}
      >
        <div style={{ marginBottom: 4, fontWeight: 500, color: theme.colors.textSecondary }}>{label}</div>
        {payload.map((entry, i) => (
          <div key={i} style={{ color: entry.color as string }}>
            {entry.name as string}: {currencyFormatter(Number(entry.value))}
          </div>
        ))}
      </div>
    );
  };

  const data = [
    {
      name: "Valores",
      Receitas: income,
      Despesas: expense,
    },
  ];

  return (
    <S.Wrapper>
      <S.Title>Receitas e Despesas</S.Title>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 12, left: 12, bottom: 5 }}
          >
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme.colors.textSecondary }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={currencyFormatter}
              tick={{ fontSize: 11, fill: theme.colors.textSecondary }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: theme.colors.textMuted + "1A" }} />
            <Bar
              dataKey="Receitas"
              fill={theme.colors.primary}
              radius={[2, 2, 0, 0]}
              maxBarSize={48}
            />
            <Bar
              dataKey="Despesas"
              fill={theme.colors.danger}
              radius={[2, 2, 0, 0]}
              maxBarSize={48}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
});

export { BarChart };

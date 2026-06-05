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
  Cell,
} from "recharts";
import type { TopCategoriesChartProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR");

const CustomTooltip = (props: Record<string, unknown>) => {
  const theme = useTheme();
  const active = props.active as boolean | undefined;
  const payload = props.payload as Array<Record<string, unknown>> | undefined;

  if (!active || !payload?.length) return null;
  const d = payload[0];
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
      <div style={{ fontWeight: 500, marginBottom: 2 }}>{d.name as string}</div>
      <div>{currencyFormatter(Number(d.value))}</div>
    </div>
  );
};

const COLORS = [
  "#3B82F6",
  "#0ECB81",
  "#F6465D",
  "#60A5FA",
  "#D4A853",
  "#A78BFA",
  "#34D399",
  "#F59E0B",
];

export const TopCategoriesChart = memo(function TopCategoriesChart({ data }: TopCategoriesChartProps) {
  const theme = useTheme();

  const chartData = data.map((d, i) => ({
    name: d.categoryName,
    value: d.totalAmount,
    fill: d.color || COLORS[i % COLORS.length],
  }));

  return (
    <S.Wrapper>
      <S.Title>Top Categorias</S.Title>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v: number) =>
                "R$" + (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v.toFixed(0))
              }
              tick={{ fontSize: 12, fill: theme.colors.textSecondary }}
              axisLine={{ stroke: theme.colors.border }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: theme.colors.textSecondary }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip content={CustomTooltip} />
            <Bar
              dataKey="value"
              name="Valor"
              radius={[0, 4, 4, 0]}
              maxBarSize={24}
            >
              {chartData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.fill} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
});

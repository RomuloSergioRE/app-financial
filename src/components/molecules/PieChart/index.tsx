"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { PieChartProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) => "R$ " + v.toLocaleString("pt-BR");

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
      <div style={{ marginBottom: 4, fontWeight: 500 }}>{d.name as string}</div>
      <div style={{ color: (d.payload as Record<string, unknown>)?.fill as string }}>
        {currencyFormatter(Number(d.value))}
      </div>
    </div>
  );
};

export const PieChart = memo(function PieChart({ categories }: PieChartProps) {
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

  const data = categories.map((c, i) => ({
    name: c.categoryName,
    value: c.totalAmount,
    color: c.color || COLORS[i % COLORS.length],
  }));

  return (
    <S.Wrapper>
      <S.Title>Gastos por Categoria</S.Title>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={`${entry.name}-${i}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
      <S.Legend>
        {data.map((entry) => (
          <S.LegendItem key={entry.name}>
            <S.LegendDot $color={entry.color} />
            <S.LegendLabel>{entry.name}</S.LegendLabel>
          </S.LegendItem>
        ))}
      </S.Legend>
    </S.Wrapper>
  );
});

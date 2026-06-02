"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BalanceChartProps } from "./types";
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

const BalanceChart = memo(function BalanceChart({ income, expense, netBalance }: BalanceChartProps) {
  const theme = useTheme();

  const data = [
    { name: "Receitas", value: income },
    { name: "Despesas", value: expense },
  ];

  return (
    <S.Wrapper>
      <S.Title>Receitas e Despesas</S.Title>
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
              paddingAngle={3}
              strokeWidth={0}
            >
              <Cell fill={theme.colors.tradingUp} />
              <Cell fill={theme.colors.tradingDown} />
            </Pie>
            <Tooltip content={CustomTooltip} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
      <S.BalanceInfo>
        <S.BalanceLabel>Saldo</S.BalanceLabel>
        <S.BalanceValue $positive={netBalance >= 0}>
          {currencyFormatter(netBalance)}
        </S.BalanceValue>
      </S.BalanceInfo>
    </S.Wrapper>
  );
});

export { BalanceChart };

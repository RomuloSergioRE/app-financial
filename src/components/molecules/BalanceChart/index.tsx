"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { BalanceChartProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR");

const BalanceChart = memo(function BalanceChart({ income, expense, netBalance }: BalanceChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

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
              innerRadius={isMobile ? 55 : 85}
              outerRadius={isMobile ? 80 : 120}
              paddingAngle={3}
              strokeWidth={0}
            >
              <Cell fill={theme.colors.tradingUp} />
              <Cell fill={theme.colors.tradingDown} />
            </Pie>
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

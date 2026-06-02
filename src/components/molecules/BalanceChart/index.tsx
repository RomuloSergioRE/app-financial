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

  const renderCenterLabel = () => {
    const isPositive = netBalance >= 0;
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x="50%"
          dy="-0.5em"
          fontSize="12"
          fill={theme.colors.textSecondary}
          fontFamily={theme.fonts.body}
        >
          Saldo
        </tspan>
        <tspan
          x="50%"
          dy="1.6em"
          fontSize="22"
          fontWeight={700}
          fill={isPositive ? theme.colors.tradingUp : theme.colors.tradingDown}
          fontFamily={theme.fonts.mono}
        >
          {currencyFormatter(netBalance)}
        </tspan>
      </text>
    );
  };

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
            {renderCenterLabel()}
          </RechartsPieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
});

export { BalanceChart };

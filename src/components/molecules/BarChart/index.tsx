"use client";

import { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { BarChartProps } from "./types";
import * as S from "./style";

const BarChart = memo(function BarChart({ income, expense }: BarChartProps) {
  const data = [
    {
      name: "Receitas vs Despesas",
      Receitas: income,
      Despesas: expense,
    },
  ];

  const currencyFormatter = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR");

  return (
    <S.Wrapper>
      <S.Title>Receitas e Despesas</S.Title>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={currencyFormatter} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => currencyFormatter(Number(value))}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #E5E7EB",
              }}
            />
            <Legend />
            <Bar
              dataKey="Receitas"
              fill="#10B981"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Despesas"
              fill="#EF4444"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
});

export { BarChart };

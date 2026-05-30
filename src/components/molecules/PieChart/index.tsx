"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieChartProps } from "./types";
import * as S from "./style";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

export function PieChart({ categories }: PieChartProps) {
  const data = categories.map((c) => ({
    name: c.categoryName,
    value: c.totalAmount,
    color: c.color ?? undefined,
  }));

  const currencyFormatter = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR");

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
              outerRadius="80%"
              innerRadius={0}
              paddingAngle={2}
              strokeWidth={0}
              label={({ name, percent }) =>
                `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={entry.color || COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => currencyFormatter(Number(value))}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #E5E7EB",
              }}
            />
            <Legend
              formatter={(value: string) => (
                <span style={{ fontSize: 12, color: "#6B7280" }}>{value}</span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.Wrapper>
  );
}

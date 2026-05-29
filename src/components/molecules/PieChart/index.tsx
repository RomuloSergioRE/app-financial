"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { PieChartProps } from "./types";
import * as S from "./style";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const data = {
    labels: categories.map((c) => c.categoryName),
    datasets: [
      {
        data: categories.map((c) => c.total),
        backgroundColor: categories.map(
          (c, i) => c.color || COLORS[i % COLORS.length]
        ),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <S.Wrapper>
      <S.Title>Gastos por Categoria</S.Title>
      <S.ChartContainer>
        <Doughnut data={data} options={options} />
      </S.ChartContainer>
    </S.Wrapper>
  );
}

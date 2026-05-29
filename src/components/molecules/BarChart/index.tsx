"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { BarChartProps } from "./types";
import * as S from "./style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({ income, expense }: BarChartProps) {
  const data = {
    labels: ["Receitas vs Despesas"],
    datasets: [
      {
        label: "Receitas",
        data: [income],
        backgroundColor: "#10B981",
        borderRadius: 6,
      },
      {
        label: "Despesas",
        data: [expense],
        backgroundColor: "#EF4444",
        borderRadius: 6,
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
    scales: {
      y: {
        ticks: {
          callback: (v: unknown) =>
            "R$ " + Number(v).toLocaleString("pt-BR"),
        },
      },
    },
  };

  return (
    <S.Wrapper>
      <S.Title>Receitas e Despesas</S.Title>
      <S.ChartContainer>
        <Bar data={data} options={options} />
      </S.ChartContainer>
    </S.Wrapper>
  );
}

"use client";

import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from "react-icons/hi2";
import type { ComparisonSummaryProps } from "./types";
import * as S from "./style";

const currencyFormatter = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR");

function formatChangePct(v: number | null): string {
  if (v === null || v === undefined) return "—";
  const sign = v >= 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}%`;
}

function isFinite(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function ComparisonSummary({
  currentIncome,
  currentOutcome,
  currentNet,
  incomeChange,
  outcomeChange,
  netChange,
}: ComparisonSummaryProps) {
  const incomePositive = isFinite(incomeChange) ? incomeChange >= 0 : undefined;
  const outcomePositive = isFinite(outcomeChange) ? outcomeChange <= 0 : undefined;
  const netPositive = isFinite(netChange) ? netChange >= 0 : undefined;

  return (
    <S.Wrapper>
      <S.Title>Comparação com Período Anterior</S.Title>
      <S.Grid>
        <S.Card>
          <S.Label>Receitas</S.Label>
          <S.Value $positive>{currencyFormatter(currentIncome)}</S.Value>
          <S.Pill $positive={incomePositive}>
            {incomePositive ? (
              <HiOutlineArrowTrendingUp size={12} />
            ) : (
              <HiOutlineArrowTrendingDown size={12} />
            )}
            {formatChangePct(incomeChange)}
          </S.Pill>
        </S.Card>
        <S.Card>
          <S.Label>Despesas</S.Label>
          <S.Value $positive={false}>{currencyFormatter(currentOutcome)}</S.Value>
          <S.Pill $positive={outcomePositive}>
            {outcomePositive ? (
              <HiOutlineArrowTrendingUp size={12} />
            ) : (
              <HiOutlineArrowTrendingDown size={12} />
            )}
            {formatChangePct(outcomeChange)}
          </S.Pill>
        </S.Card>
        <S.Card>
          <S.Label>Saldo</S.Label>
          <S.Value $positive={currentNet >= 0}>{currencyFormatter(currentNet)}</S.Value>
          <S.Pill $positive={netPositive}>
            {netPositive ? (
              <HiOutlineArrowTrendingUp size={12} />
            ) : (
              <HiOutlineArrowTrendingDown size={12} />
            )}
            {formatChangePct(netChange)}
          </S.Pill>
        </S.Card>
      </S.Grid>
    </S.Wrapper>
  );
}

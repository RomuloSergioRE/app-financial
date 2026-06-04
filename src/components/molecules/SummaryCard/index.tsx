"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import type { SummaryCardProps, SummaryType } from "./types";
import * as S from "./style";

export const SummaryCard = memo(function SummaryCard({ label, value, icon, type, change }: SummaryCardProps) {
  const theme = useTheme();

  const accentColors: Record<SummaryType, string> = {
    income: theme.colors.primary,
    outcome: theme.colors.danger,
    balance: value >= 0 ? theme.colors.tradingUp : theme.colors.tradingDown,
  };

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return (
    <S.Wrapper $accent={accentColors[type]}>
      <S.HeaderRow>
        <S.IconWrapper $color={accentColors[type]}>{icon}</S.IconWrapper>
        <S.Label>{label}</S.Label>
      </S.HeaderRow>
      <S.Value $color={accentColors[type]}>
        {formatted}
      </S.Value>
      {change !== undefined && (
        <S.Change $positive={change >= 0}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
        </S.Change>
      )}
    </S.Wrapper>
  );
});

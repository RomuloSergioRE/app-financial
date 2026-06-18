"use client";

import { memo } from "react";
import { useTheme } from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/format";
import type { SummaryCardProps, SummaryType } from "./types";
import * as S from "./style";

export const SummaryCard = memo(function SummaryCard({
  label,
  value,
  icon,
  type,
  change,
}: SummaryCardProps) {
  const theme = useTheme();
  const { currency } = useAuth();

  const accentColors: Record<SummaryType, string> = {
    income: theme.colors.primary,
    outcome: theme.colors.danger,
    balance: value >= 0 ? theme.colors.tradingUp : theme.colors.danger,
  };

  const formatted = formatCurrency(value, currency);

  return (
    <S.Wrapper $accent={accentColors[type]}>
      <S.HeaderRow>
        <S.IconWrapper $color={accentColors[type]}>{icon}</S.IconWrapper>
        <S.Label>{label}</S.Label>
      </S.HeaderRow>
      <S.Value $color={accentColors[type]}>{formatted}</S.Value>
      {change !== undefined && (
        <S.Change $positive={change >= 0}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
        </S.Change>
      )}
    </S.Wrapper>
  );
});

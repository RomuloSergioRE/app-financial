"use client";

import type { Period, PeriodFilterProps } from "./types";
import * as S from "./style";

const periods: { value: Period; label: string }[] = [
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
  { value: "year", label: "Ano" },
];

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <S.Wrapper>
      {periods.map((p) => (
        <S.Tab key={p.value} $active={value === p.value} onClick={() => onChange(p.value)}>
          {p.label}
        </S.Tab>
      ))}
    </S.Wrapper>
  );
}

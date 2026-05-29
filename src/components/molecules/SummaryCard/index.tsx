import type { SummaryCardProps } from "./types";
import * as S from "./style";

export function SummaryCard({ label, value, icon, color }: SummaryCardProps) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return (
    <S.Wrapper>
      <S.IconWrapper $color={color}>
        <span>{icon}</span>
      </S.IconWrapper>
      <S.Content>
        <S.Label>{label}</S.Label>
        <S.Value>{formatted}</S.Value>
      </S.Content>
    </S.Wrapper>
  );
}

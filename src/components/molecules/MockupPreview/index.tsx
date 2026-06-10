"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

export function MockupPreview() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper ref={ref} $visible={isVisible}>
      <S.Frame>
        <S.FrameHeader>
          <S.Dot color="#EF4444" />
          <S.Dot color="#F59E0B" />
          <S.Dot color="#10B981" />
        </S.FrameHeader>
        <S.FrameContent>
          <S.ChartRow>
            <S.ChartBar $height={60} />
            <S.ChartBar $height={40} />
            <S.ChartBar $height={75} />
            <S.ChartBar $height={50} />
            <S.ChartBar $height={30} />
            <S.ChartBar $height={65} />
            <S.ChartBar $height={45} />
          </S.ChartRow>
          <div>
            <S.StatRow>
              <S.StatLabel>Receitas</S.StatLabel>
              <S.StatValue>R$ 12.450,00</S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatLabel>Despesas</S.StatLabel>
              <S.StatValue style={{ color: "#F6465D" }}>
                R$ 8.230,00
              </S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatLabel>Saldo</S.StatLabel>
              <S.StatValue>R$ 4.220,00</S.StatValue>
            </S.StatRow>
          </div>
        </S.FrameContent>
      </S.Frame>
    </S.Wrapper>
  );
}

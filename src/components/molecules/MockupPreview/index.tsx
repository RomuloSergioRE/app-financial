"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

const BALANCE = [
  { label: "Receitas", value: "R$ 12.450", accent: "#0ECB81" },
  { label: "Despesas", value: "R$ 8.230", accent: "#F6465D" },
  { label: "Saldo", value: "R$ 4.220", accent: "#3B82F6" },
];

const CHART_DATA = [
  { day: "Seg", income: 65, expense: 40 },
  { day: "Ter", income: 45, expense: 55 },
  { day: "Qua", income: 80, expense: 35 },
  { day: "Qui", income: 55, expense: 60 },
  { day: "Sex", income: 70, expense: 30 },
  { day: "Sáb", income: 35, expense: 25 },
  { day: "Dom", income: 50, expense: 20 },
];

const TRANSACTIONS = [
  { description: "Freelance Projeto X", category: "Receita", amount: "+R$ 3.200", positive: true },
  { description: "Supermercado", category: "Alimentação", amount: "-R$ 587", positive: false },
  { description: "Assinatura SaaS", category: "Ferramentas", amount: "-R$ 99", positive: false },
];

export function MockupPreview() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper ref={ref} $visible={isVisible}>
      <S.Frame>
        <S.FrameHeader>
          <S.Dot $color="#EF4444" />
          <S.Dot $color="#F59E0B" />
          <S.Dot $color="#10B981" />
        </S.FrameHeader>
        <S.FrameContent>
          <S.BalanceRow>
            {BALANCE.map((item) => (
              <S.BalanceCard key={item.label} $accent={item.accent}>
                <S.BalanceLabel>{item.label}</S.BalanceLabel>
                <S.BalanceValue>{item.value}</S.BalanceValue>
              </S.BalanceCard>
            ))}
          </S.BalanceRow>

          <S.ChartSection>
            <S.ChartLabel>Receitas × Despesas — Esta Semana</S.ChartLabel>
            <S.ChartRow>
              {CHART_DATA.map((day) => (
                <div key={day.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ display: "flex", gap: 3, width: "100%", height: 80, alignItems: "flex-end" }}>
                    <S.ChartBar $height={day.income} $color="#0ECB81" />
                    <S.ChartBar $height={day.expense} $color="#F6465D" />
                  </div>
                  <S.DayLabel>{day.day}</S.DayLabel>
                </div>
              ))}
            </S.ChartRow>
          </S.ChartSection>

          <S.TransactionsSection>
            <S.TxHeader>
              <S.TxTitle>Últimas Transações</S.TxTitle>
              <S.TxViewAll>Ver todas</S.TxViewAll>
            </S.TxHeader>
            <S.TxList>
              {TRANSACTIONS.map((tx) => (
                <S.TxItem key={tx.description}>
                  <S.TxInfo>
                    <S.TxDescription>{tx.description}</S.TxDescription>
                    <S.TxCategory>{tx.category}</S.TxCategory>
                  </S.TxInfo>
                  <S.TxAmount $positive={tx.positive}>{tx.amount}</S.TxAmount>
                </S.TxItem>
              ))}
            </S.TxList>
          </S.TransactionsSection>
        </S.FrameContent>
      </S.Frame>
    </S.Wrapper>
  );
}

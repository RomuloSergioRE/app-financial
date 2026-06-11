"use client";

import { PricingCard } from "@/components/molecules/PricingCard";
import * as S from "./styles";

const PLANS = [
  {
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar a organizar suas finanças pessoais.",
    features: [
      "Dashboard básico",
      "Até 100 transações/mês",
      "1 usuário",
      "Categorias padrão",
      "Relatórios mensais",
    ],
    highlighted: false,
    cta: "Começar Grátis",
    ctaHref: "/register",
  },
  {
    name: "Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para profissionais que precisam de controle avançado.",
    features: [
      "Dashboard completo",
      "Transações ilimitadas",
      "Até 5 usuários",
      "Categorias personalizadas",
      "Relatórios avançados",
      "Regras recorrentes",
      "Exportação de dados",
    ],
    highlighted: true,
    badge: "Mais popular",
    cta: "Assinar Pro",
    ctaHref: "/register",
  },
  {
    name: "Enterprise",
    price: "R$ 99",
    period: "/mês",
    description: "Solução completa para empresas e equipes financeiras.",
    features: [
      "Tudo do Pro",
      "Usuários ilimitados",
      "Múltiplas organizações",
      "API de integração",
      "Suporte prioritário",
      "Relatórios customizados",
      "Auditoria completa",
    ],
    highlighted: false,
    cta: "Falar com Vendas",
    ctaHref: "/register",
  },
];

export function Pricing() {
  return (
    <S.Wrapper id="planos">
      <S.Container>
        <S.Title>Planos que se adaptam a você</S.Title>
        <S.Subtitle>
          Do controle pessoal à gestão empresarial completa. Escolha o plano 
          ideal para seu momento.
        </S.Subtitle>
        <S.Grid>
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
            />
          ))}
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}

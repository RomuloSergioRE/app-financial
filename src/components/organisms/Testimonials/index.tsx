"use client";

import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import * as S from "./styles";

const TESTIMONIALS = [
  {
    name: "Ana Silva",
    role: "CEO — Silva Tech",
    quote: "O ZenyFin transformou a gestão financeira da minha empresa. Reduzimos o tempo gasto com relatórios em 80% e agora temos visibilidade total do fluxo de caixa.",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Freelancer",
    quote: "Finalmente um app que resolve tanto finanças pessoais quanto empresariais. A categorização automática e os relatórios mensais são incríveis.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    role: "CFO — Costa Corp",
    quote: "A funcionalidade multiusuário com permissões personalizadas foi essencial para nossa equipe financeira. Recomendo para qualquer empresa que queira organizar suas contas.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <S.Wrapper id="depoimentos">
      <S.Container>
        <S.Title>O que nossos usuários dizem</S.Title>
        <S.Grid>
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              quote={t.quote}
              rating={t.rating}
            />
          ))}
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

const icons = {
  simplicidade: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
    </svg>
  ),
  transparencia: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  confiabilidade: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
};

const cards = [
  { icon: icons.simplicidade, number: "01", title: "Simplicidade", desc: "Interface intuitiva que qualquer pessoa usa sem treinamento." },
  { icon: icons.transparencia, number: "02", title: "Transparência", desc: "Todos os dados claros, sem letras miúdas ou custos escondidos." },
  { icon: icons.confiabilidade, number: "03", title: "Confiabilidade", desc: "Criptografia de ponta a ponta e conformidade com LGPD." },
];

export function About() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper id="sobre">
      <S.Container ref={ref} $visible={isVisible}>
        <S.Title>Por que App Financial?</S.Title>
        <S.Grid>
          <S.TextCol>
            <S.TextContent>
              <S.Paragraph>
                O App Financial nasceu para <S.Highlight>resolver o caos</S.Highlight> de quem precisa 
                gerenciar finanças pessoais e empresariais em paralelo. Chega de 
                <S.Highlight>planilhas perdidas, extratos espalhados e controle manual</S.Highlight>.
              </S.Paragraph>
              <S.Paragraph>
                Com uma interface limpa e <S.Highlight>relatórios em tempo real</S.Highlight>, você tem 
                visão completa de <S.Highlight>receitas, despesas, orçamentos e metas</S.Highlight> — 
                tudo sincronizado automaticamente.
              </S.Paragraph>
            </S.TextContent>
          </S.TextCol>
          <S.ValuesCol>
            {cards.map((card) => (
              <S.ValueCard key={card.number}>
                <S.TitleRow>
                  <S.IconBox>{card.icon}</S.IconBox>
                  <S.ValueTitle>{card.title}</S.ValueTitle>
                  <S.ValueNumber>{card.number}</S.ValueNumber>
                </S.TitleRow>
                <S.ValueDesc>{card.desc}</S.ValueDesc>
              </S.ValueCard>
            ))}
          </S.ValuesCol>
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

export function About() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper id="sobre">
      <S.Container ref={ref} $visible={isVisible}>
        <S.Title>Por que App Financial?</S.Title>
        <S.Grid>
          <S.TextCol>
            <S.Paragraph>
              O App Financial nasceu para resolver o caos de quem precisa 
              gerenciar finanças pessoais e empresariais em paralelo. Chega de 
              planilhas perdidas, extratos espalhados e controle manual.
            </S.Paragraph>
            <S.Paragraph>
              Com uma interface limpa e relatórios em tempo real, você tem 
              visão completa de receitas, despesas, orçamentos e metas — 
              tudo sincronizado automaticamente.
            </S.Paragraph>
          </S.TextCol>
          <S.ValuesCol>
            <S.ValueCard>
              <S.ValueNumber>01</S.ValueNumber>
              <S.ValueTitle>Simplicidade</S.ValueTitle>
              <S.ValueDesc>
                Interface intuitiva que qualquer pessoa usa sem treinamento.
              </S.ValueDesc>
            </S.ValueCard>
            <S.ValueCard>
              <S.ValueNumber>02</S.ValueNumber>
              <S.ValueTitle>Transparência</S.ValueTitle>
              <S.ValueDesc>
                Todos os dados claros, sem letras miúdas ou custos escondidos.
              </S.ValueDesc>
            </S.ValueCard>
            <S.ValueCard>
              <S.ValueNumber>03</S.ValueNumber>
              <S.ValueTitle>Confiabilidade</S.ValueTitle>
              <S.ValueDesc>
                Criptografia de ponta a ponta e conformidade com LGPD.
              </S.ValueDesc>
            </S.ValueCard>
          </S.ValuesCol>
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

export function CtaSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper>
      <S.Container ref={ref} $visible={isVisible}>
        <S.Title>Pronto para transformar suas finanças?</S.Title>
        <S.Subtitle>
          Comece grátis hoje. Sem cartão de crédito, sem compromisso.
        </S.Subtitle>
        <Button as={Link} href="/register" size="lg">
          Criar Conta Gratuita
        </Button>
        <S.Disclaimer>
          Não precisa de cartão de crédito • Cancele quando quiser
        </S.Disclaimer>
      </S.Container>
    </S.Wrapper>
  );
}

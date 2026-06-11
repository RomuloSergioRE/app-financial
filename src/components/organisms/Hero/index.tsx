"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { MockupPreview } from "@/components/molecules/MockupPreview";
import * as S from "./styles";

export function Hero() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Content>
          <S.Badge>Nova versão disponível</S.Badge>
          <S.Title>Controle financeiro simples e inteligente</S.Title>
          <S.Subtitle>
            Gerencie suas finanças pessoais e empresariais em um só lugar. 
            Dashboard em tempo real, relatórios inteligentes e muito mais.
          </S.Subtitle>
          <S.Actions>
            <Button as={Link} href="/register" size="md">
              Começar Grátis
            </Button>
            <Button as={Link} href="#sobre" variant="outline" size="md">
              Saiba Mais
            </Button>
          </S.Actions>
          <S.TrustRow>
            <S.Bullet />
            <span>Gratuito para começar</span>
            <S.Bullet />
            <span>Sem cartão de crédito</span>
            <S.Bullet />
            <span>Cancele quando quiser</span>
          </S.TrustRow>
        </S.Content>
        <S.MockupColumn>
          <MockupPreview />
        </S.MockupColumn>
      </S.Container>
    </S.Wrapper>
  );
}

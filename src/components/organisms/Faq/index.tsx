"use client";

import { FaqItem } from "@/components/molecules/FaqItem";
import * as S from "./styles";

const FAQ_DATA = [
  {
    question: "O ZenyFin é gratuito?",
    answer: "Sim! Oferecemos um plano gratuito com funcionalidades básicas para você começar. Conforme sua necessidade crescer, você pode migrar para o plano Pro ou Enterprise do ZenyFin.",
  },
  {
    question: "Posso usar para empresa e pessoa física?",
    answer: "Sim. O plano Free é ideal para uso pessoal. Já os planos Pro e Enterprise permitem gerenciar múltiplas organizações e usuários, perfeito para empresas.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. Utilizamos criptografia de ponta a ponta, servidores seguros e seguimos rigorosamente a LGPD. Seus dados financeiros estão protegidos.",
  },
  {
    question: "Funciona offline?",
    answer: "Atualmente o ZenyFin funciona 100% online para garantir sincronização em tempo real entre todos os dispositivos e usuários.",
  },
  {
    question: "Como faço para cancelar?",
    answer: "Você pode cancelar quando quiser diretamente nas configurações da sua conta no ZenyFin. Sem multas, sem burocracia. Seu plano continuará ativo até o final do período já pago.",
  },
];

export function Faq() {
  return (
    <S.Wrapper id="faq">
      <S.Container>
        <S.Title>Perguntas Frequentes</S.Title>
        <S.List>
          {FAQ_DATA.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </S.List>
      </S.Container>
    </S.Wrapper>
  );
}

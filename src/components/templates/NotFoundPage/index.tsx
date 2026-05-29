import Link from "next/link";
import * as S from "./style";

export function NotFoundPage() {
  return (
    <S.Wrapper>
      <S.Title>404</S.Title>
      <S.Description>Página não encontrada</S.Description>
      <Link href="/" passHref legacyBehavior>
        <S.HomeLink>Voltar ao início</S.HomeLink>
      </Link>
    </S.Wrapper>
  );
}

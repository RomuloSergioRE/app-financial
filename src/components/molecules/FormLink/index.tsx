import type { FormLinkProps } from "./types";
import * as S from "./style";

export function FormLink({ text, linkText, href }: FormLinkProps) {
  return (
    <S.Wrapper>
      {text} <S.StyledLink href={href}>{linkText}</S.StyledLink>
    </S.Wrapper>
  );
}

import type { AuthCardProps } from "./types";
import * as S from "./style";

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <S.Wrapper>
      <S.Card>
        <S.Title>{title}</S.Title>
        {children}
      </S.Card>
    </S.Wrapper>
  );
}

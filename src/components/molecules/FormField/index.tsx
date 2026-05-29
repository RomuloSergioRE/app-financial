import type { FormFieldProps } from "./types";
import * as S from "./style";

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <S.Wrapper>
      <S.Label>{label}</S.Label>
      {children}
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Wrapper>
  );
}

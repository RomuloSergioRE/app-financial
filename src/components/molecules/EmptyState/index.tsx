import type { EmptyStateProps } from "./types";
import * as S from "./style";

export function EmptyState({
  icon = undefined,
  title,
  description = undefined,
  action = undefined,
}: EmptyStateProps) {
  return (
    <S.Wrapper>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
      {action && <S.Action>{action}</S.Action>}
    </S.Wrapper>
  );
}

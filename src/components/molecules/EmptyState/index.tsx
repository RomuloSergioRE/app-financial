import { ReactNode } from "react";
import * as S from "./style";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <S.Wrapper>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
      {action && <S.Action>{action}</S.Action>}
    </S.Wrapper>
  );
}

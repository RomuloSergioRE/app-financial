"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import * as S from "./style";

export function NotFoundPage() {
  const t = useTranslations("error");
  return (
    <S.Wrapper>
      <S.Title>404</S.Title>
      <S.Description>{t("paginaNaoEncontrada")}</S.Description>
      <Link href="/">
        <S.HomeLink>{t("voltarInicio")}</S.HomeLink>
      </Link>
    </S.Wrapper>
  );
}

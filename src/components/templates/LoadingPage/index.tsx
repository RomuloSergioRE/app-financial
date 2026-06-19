"use client";

import { useTranslations } from "next-intl";
import * as S from "./style";

export function LoadingPage() {
  const t = useTranslations("common");
  return <S.Wrapper>{t("carregando")}</S.Wrapper>;
}

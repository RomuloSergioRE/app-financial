"use client";

import { HiOutlineLockClosed } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import * as S from "./style";

interface UpgradeBannerProps {
  plan?: "pro" | "enterprise";
}

export function UpgradeBanner({ plan = "pro" }: UpgradeBannerProps) {
  const t = useTranslations("upgrade");
  const { requirePlan } = useUpgradeModal();
  const planName = plan === "enterprise" ? "Enterprise" : "Pro";

  return (
    <S.Wrapper>
      <HiOutlineLockClosed size={20} />
      <S.Content>
        <Text as="p" size="sm" weight="medium">
          {t("titulo")}
        </Text>
        <Text as="p" size="xs" color="textSecondary">
          {t.rich("descricao", { plan: () => <strong>{planName}</strong> })}
        </Text>
      </S.Content>
      <Button size="sm" variant="outline" onClick={() => requirePlan(plan)}>
        Upgrade
      </Button>
    </S.Wrapper>
  );
}

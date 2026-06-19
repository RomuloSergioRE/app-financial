"use client";

import type { ReactNode } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccessFeature } from "@/lib/permissions";
import type { Feature } from "@/lib/permissions";
import * as S from "./style";

interface ProFeatureGateProps {
  feature: Feature;
  plan?: "pro" | "enterprise";
  children: ReactNode;
}

export function ProFeatureGate({ feature, plan: explicitPlan, children }: ProFeatureGateProps) {
  const { plan } = useAuth();
  const t = useTranslations("upgrade");
  const { requirePlan } = useUpgradeModal();

  const hasAccess = canAccessFeature(plan, feature);

  if (hasAccess) return <>{children}</>;

  const requiredPlan = explicitPlan || "pro";
  const planName = requiredPlan === "enterprise" ? "Enterprise" : "Pro";

  return (
    <S.Container>
      <S.FormWrapper>{children}</S.FormWrapper>
      <S.Overlay>
        <HiOutlineLockClosed size={24} />
        <Text as="p" size="sm" weight="medium">
          {t("titulo")}
        </Text>
        <Text as="p" size="xs" color="textSecondary">
          {t("descricao", { plan: planName })}
        </Text>
        <Button size="sm" variant="outline" onClick={() => requirePlan(requiredPlan)}>
          Upgrade
        </Button>
      </S.Overlay>
    </S.Container>
  );
}

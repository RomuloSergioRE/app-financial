"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  ctaHref: string;
  icon: ReactNode;
  delay?: number;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  highlighted,
  badge,
  cta,
  ctaHref,
  icon,
  delay = 0,
}: PricingCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper
      ref={ref}
      $highlighted={highlighted}
      $visible={isVisible}
      $delay={delay}
    >
      {badge && <S.Badge>{badge}</S.Badge>}

      <S.PlanName $highlighted={highlighted}>{name}</S.PlanName>

      <S.PriceRow>
        <S.Value $highlighted={highlighted}>{price}</S.Value>
        <S.Period $highlighted={highlighted}>{period}</S.Period>
      </S.PriceRow>

      <S.Description $highlighted={highlighted}>{description}</S.Description>

      <S.Features>
        {features.map((f) => (
          <S.FeatureItem key={f} $highlighted={highlighted}>
            <CheckIcon />
            {f}
          </S.FeatureItem>
        ))}
      </S.Features>

      <Button
        as={Link}
        href={ctaHref}
        variant={highlighted ? "primary" : "outline"}
        style={{ width: "100%" }}
      >
        {cta}
      </Button>
    </S.Wrapper>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

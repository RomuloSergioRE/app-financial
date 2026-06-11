"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button";
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
}: PricingCardProps) {
  return (
    <S.Wrapper $highlighted={highlighted}>
      {badge && <S.Badge>{badge}</S.Badge>}

      <S.PlanName>{name}</S.PlanName>

      <S.PriceRow>
        <S.Value>{price}</S.Value>
        <S.Period>{period}</S.Period>
      </S.PriceRow>

      <S.Description>{description}</S.Description>

      <S.Features>
        {features.map((f) => (
          <S.FeatureItem key={f}>
            <CheckIcon />
            {f}
          </S.FeatureItem>
        ))}
      </S.Features>

      <Button
        as={Link}
        href={ctaHref}
        variant="primary"
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

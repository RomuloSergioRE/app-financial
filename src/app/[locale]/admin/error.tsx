"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ErrorPage } from "@/components/templates/ErrorPage";
import { logger } from "@/lib/logger";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  useEffect(() => {
    logger.error(t("admin"), error);
  }, [error, t]);

  return <ErrorPage reset={reset} />;
}

"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/templates/ErrorPage";
import { logger } from "@/lib/logger";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Dashboard error:", error);
  }, [error]);

  return <ErrorPage reset={reset} />;
}

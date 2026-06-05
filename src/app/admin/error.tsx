"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/templates/ErrorPage";
import { logger } from "@/lib/logger";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Admin error:", error);
  }, [error]);

  return <ErrorPage reset={reset} />;
}

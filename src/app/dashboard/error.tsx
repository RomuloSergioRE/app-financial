"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/templates/ErrorPage";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return <ErrorPage reset={reset} />;
}

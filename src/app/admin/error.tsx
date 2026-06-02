"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/templates/ErrorPage";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return <ErrorPage reset={reset} />;
}

"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/templates/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro na aplicação:", error);
  }, [error]);

  return <ErrorPage reset={reset} />;
}

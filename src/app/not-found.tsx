"use client";

import { useTheme } from "styled-components";
import Link from "next/link";

export default function NotFound() {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
        padding: "16px",
        textAlign: "center",
        background: theme.colors.background,
      }}
    >
      <h1 style={{ fontSize: "3rem", color: theme.colors.text, margin: 0 }}>
        404
      </h1>
      <p style={{ color: theme.colors.textSecondary, margin: 0 }}>
        Página não encontrada
      </p>
      <Link
        href="/"
        style={{
          padding: "8px 16px",
          background: theme.colors.primary,
          color: "#FFFFFF",
          borderRadius: theme.borderRadius.md,
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}

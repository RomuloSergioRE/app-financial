"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/lib/permissions";

interface RouteGuardProps {
  allowedRoles: Role[];
  children: ReactNode;
  redirectTo?: string;
}

export function RouteGuard({
  allowedRoles,
  children,
  redirectTo,
}: RouteGuardProps) {
  const { role, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    if (!role) {
      router.replace("/login");
      return;
    }

    const hasAccess = allowedRoles.includes(role);
    if (!hasAccess) {
      router.replace(redirectTo ?? "/dashboard");
    }
  }, [role, initializing, allowedRoles, redirectTo, router]);

  if (initializing || !role) {
    return null;
  }

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}

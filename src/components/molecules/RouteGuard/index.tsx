"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { Role, Plan } from "@/lib/permissions";
import { PLAN_TIER } from "@/lib/permissions";

interface RouteGuardProps {
  allowedRoles?: Role[];
  minPlan?: Plan;
  children: ReactNode;
  redirectTo?: string;
}

export function RouteGuard({
  allowedRoles,
  minPlan,
  children,
  redirectTo,
}: RouteGuardProps) {
  const { role, plan, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    if (!role) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.replace(redirectTo ?? "/dashboard");
      return;
    }

    if (minPlan && plan && PLAN_TIER[plan] < PLAN_TIER[minPlan]) {
      router.replace(redirectTo ?? "/dashboard");
    }
  }, [role, plan, initializing, allowedRoles, minPlan, redirectTo, router]);

  if (initializing || !role) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return null;
  }

  if (minPlan && plan && PLAN_TIER[plan] < PLAN_TIER[minPlan]) {
    return null;
  }

  return <>{children}</>;
}

"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { Role, Plan, Feature } from "@/lib/permissions";
import { canAccessFeature } from "@/lib/permissions";

interface CanProps {
  roles?: Role[];
  plans?: Plan[];
  feature?: Feature;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ roles, plans, feature, children, fallback = null }: CanProps) {
  const { role, plan } = useAuth();

  if (roles && role && !roles.includes(role)) {
    return <>{fallback}</>;
  }

  if (plans && plan && !plans.includes(plan)) {
    return <>{fallback}</>;
  }

  if (feature && plan && !canAccessFeature(plan, feature)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

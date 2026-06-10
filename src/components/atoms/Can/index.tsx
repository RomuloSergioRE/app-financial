"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/lib/permissions";

interface CanProps {
  roles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ roles, children, fallback = null }: CanProps) {
  const { role } = useAuth();

  if (!role || !roles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

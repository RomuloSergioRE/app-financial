import type { NavItem } from "@/components/molecules/Sidebar/types";

export type Role = "user" | "company" | "admin";
export type Plan = "free" | "pro" | "enterprise";

const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard": ["user", "company"],
  "/transactions": ["user", "company"],
  "/categories": ["user", "company"],
  "/tags": ["user", "company"],
  "/budgets": ["user", "company"],
  "/goals": ["user"],
  "/recurring-rules": ["user", "company"],
  "/organizations": ["company"],
  "/profile": ["user", "company"],
  "/settings": ["user", "company"],
  "/admin": ["admin"],
};

export const PLAN_TIER: Record<Plan, number> = {
  free: 0,
  pro: 1,
  enterprise: 2,
};

export type Feature =
  | "unlimited-transactions"
  | "tags"
  | "budgets"
  | "goals"
  | "recurring-rules"
  | "organizations"
  | "advanced-reports"
  | "export-data"
  | "multiple-users";

const FEATURE_PERMISSIONS: Record<Feature, Plan> = {
  "unlimited-transactions": "pro",
  tags: "pro",
  budgets: "pro",
  goals: "pro",
  "recurring-rules": "pro",
  organizations: "enterprise",
  "advanced-reports": "pro",
  "export-data": "pro",
  "multiple-users": "enterprise",
};

export function canAccess(role: Role | null, path: string): boolean {
  if (!role) return false;

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;

  for (const [route, allowed] of Object.entries(ROUTE_PERMISSIONS)) {
    if (normalized === route || normalized.startsWith(route + "/")) {
      return allowed.includes(role);
    }
  }

  return false;
}

const ROUTE_PLAN: Record<string, Plan> = {
  "/tags": "pro",
  "/budgets": "pro",
  "/goals": "pro",
  "/recurring-rules": "pro",
  "/organizations": "enterprise",
};

export function getRequiredPlan(path: string): Plan | null {
  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  for (const [route, plan] of Object.entries(ROUTE_PLAN)) {
    if (normalized === route || normalized.startsWith(route + "/")) {
      return plan;
    }
  }
  return null;
}

export function canAccessFeature(plan: Plan | null | undefined, feature: Feature): boolean {
  if (!plan) return false;
  const required = FEATURE_PERMISSIONS[feature];
  return PLAN_TIER[plan] >= PLAN_TIER[required];
}

export function filterNavItems(items: NavItem[], role: Role, plan?: Plan | null): NavItem[] {
  return items.filter((item) => {
    const normalized = item.href.endsWith("/")
      ? item.href.slice(0, -1)
      : item.href;
    const allowed = ROUTE_PERMISSIONS[normalized];
    return allowed ? allowed.includes(role) : true;
  });
}

import type { NavItem } from "@/components/molecules/Sidebar/types";

export type Role = "user" | "company" | "admin";

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

export function filterNavItems(items: NavItem[], role: Role): NavItem[] {
  return items.filter((item) => {
    const normalized = item.href.endsWith("/")
      ? item.href.slice(0, -1)
      : item.href;
    const allowed = ROUTE_PERMISSIONS[normalized];
    return allowed ? allowed.includes(role) : true;
  });
}

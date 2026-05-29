export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export const TRANSACTION_TYPE_LABELS = {
  income: "Receita",
  expense: "Despesa",
} as const;

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;



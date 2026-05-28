export interface BalanceResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  periodStart: string;
  periodEnd: string;
}

export interface CategoryDistribution {
  categoryId: number;
  categoryName: string;
  color?: string;
  total: number;
  percentage: number;
  transactionCount: number;
}

export interface CategoriesAnalyticsResponse {
  total: number;
  categories: CategoryDistribution[];
  periodStart: string;
  periodEnd: string;
}

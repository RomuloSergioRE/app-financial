export interface BalanceResponse {
  totalIncome: number;
  totalOutcome: number;
  netBalance: number;
}

export interface CategoryDistribution {
  categoryId: string;
  categoryName: string;
  color?: string | null;
  icon?: string | null;
  totalAmount: number;
  percentage: number;
  transactionCount?: number;
}



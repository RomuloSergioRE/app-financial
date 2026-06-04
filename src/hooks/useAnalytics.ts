import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";

export function useBalance(startDate?: string, endDate?: string): AsyncState<BalanceDTO> {
  const query = useQuery({
    queryKey: ["analytics", "balance", startDate, endDate],
    queryFn: () => analyticsService.balance({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

type BalanceDTO = {
  totalIncome: number;
  totalOutcome: number;
  netBalance: number;
};

export function useCategoriesAnalytics(startDate?: string, endDate?: string): AsyncState<CategoryDistDTO[]> {
  const query = useQuery({
    queryKey: ["analytics", "categories", startDate, endDate],
    queryFn: () => analyticsService.categories({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

type CategoryDistDTO = {
  categoryId: string;
  categoryName: string;
  color?: string | null;
  icon?: string | null;
  totalAmount: number;
  percentage: number;
  transactionCount?: number;
};

export function getDateRange(period: "week" | "month" | "year") {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "week":
      start.setDate(start.getDate() - 7);
      break;
    case "month":
      start.setMonth(start.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics";

export function useBalance(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["analytics", "balance", startDate, endDate],
    queryFn: () => analyticsService.balance({ startDate, endDate }),
  });
}

export function useCategoriesAnalytics(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["analytics", "categories", startDate, endDate],
    queryFn: () => analyticsService.categories({ startDate, endDate }),
  });
}

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

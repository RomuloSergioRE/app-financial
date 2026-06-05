import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type { BalanceResponseDTO, CategoryDistributionDTO } from "@/schemas/analytics.schema";

export function useBalance(startDate?: string, endDate?: string): AsyncState<BalanceResponseDTO> {
  const query = useQuery({
    queryKey: ["analytics", "balance", startDate, endDate],
    queryFn: () => analyticsService.balance({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

export function useCategoriesAnalytics(startDate?: string, endDate?: string): AsyncState<CategoryDistributionDTO[]> {
  const query = useQuery({
    queryKey: ["analytics", "categories", startDate, endDate],
    queryFn: () => analyticsService.categories({ startDate, endDate }),
  });
  return mapAsyncState(query);
}



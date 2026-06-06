import { useQuery, useMutation } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { mapAsyncState } from "@/lib/map-async-state";
import type { AsyncState } from "@/types/async";
import type {
  BalanceResponse,
  CategoryDistribution,
  MonthlySeries,
  Comparison,
  TopCategory,
  Summary,
  CashFlow,
} from "@/types";

export function useBalance(startDate?: string, endDate?: string): AsyncState<BalanceResponse> {
  const query = useQuery({
    queryKey: ["analytics", "balance", startDate, endDate],
    queryFn: () => analyticsService.balance({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

export function useCategoriesAnalytics(
  startDate?: string,
  endDate?: string,
): AsyncState<CategoryDistribution[]> {
  const query = useQuery({
    queryKey: ["analytics", "categories", startDate, endDate],
    queryFn: () => analyticsService.categories({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

export function useMonthlySeries(startDate: string, endDate: string): AsyncState<MonthlySeries[]> {
  const query = useQuery({
    queryKey: ["analytics", "monthly-series", startDate, endDate],
    queryFn: () => analyticsService.monthlySeries({ startDate, endDate }),
  });
  return mapAsyncState(query);
}

export function useComparison(month: number, year: number): AsyncState<Comparison> {
  const query = useQuery({
    queryKey: ["analytics", "comparison", month, year],
    queryFn: () => analyticsService.comparison({ month, year }),
  });
  return mapAsyncState(query);
}

export function useTopCategories(
  startDate: string,
  endDate: string,
  limit?: number,
): AsyncState<TopCategory[]> {
  const query = useQuery({
    queryKey: ["analytics", "top-categories", startDate, endDate, limit],
    queryFn: () => analyticsService.topCategories({ startDate, endDate, limit }),
  });
  return mapAsyncState(query);
}

export function useSummary(month?: number, year?: number): AsyncState<Summary> {
  const query = useQuery({
    queryKey: ["analytics", "summary", month, year],
    queryFn: () => analyticsService.summary({ month, year }),
  });
  return mapAsyncState(query);
}

export function useCashFlow(months?: number): AsyncState<CashFlow[]> {
  const query = useQuery({
    queryKey: ["analytics", "cash-flow", months],
    queryFn: () => analyticsService.cashFlow({ months }),
  });
  return mapAsyncState(query);
}

import { downloadBlob } from "@/lib/download";

export function useExportCsv() {
  return useMutation({
    mutationFn: ({
      startDate,
      endDate,
      type,
    }: {
      startDate: string;
      endDate: string;
      type?: "transactions" | "categories" | "all";
    }) => analyticsService.exportCsv({ startDate, endDate, type }),
    onSuccess: (blob) => {
      downloadBlob(blob, `export-${new Date().toISOString().split("T")[0]}.csv`);
    },
  });
}

export function useExportPdf() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: { startDate: string; endDate: string }) =>
      analyticsService.exportPdf({ startDate, endDate }),
    onSuccess: (blob) => {
      downloadBlob(blob, `relatorio-${new Date().toISOString().split("T")[0]}.pdf`);
    },
  });
}

import type { UseQueryResult } from "@tanstack/react-query";
import type { AsyncState } from "@/types/async";

export function mapAsyncState<T>(result: UseQueryResult<T>): AsyncState<T> {
  if (result.isPending) return { status: "loading" };
  if (result.isError)
    return { status: "error", error: result.error?.message ?? "Erro desconhecido" };
  return { status: "success", data: result.data as T };
}

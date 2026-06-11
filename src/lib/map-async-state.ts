import type { UseQueryResult } from "@tanstack/react-query";
import type { AsyncState } from "@/types/async";
import { extractErrorMessage } from "@/utils/errors";

export function mapAsyncState<T>(result: UseQueryResult<T>): AsyncState<T> {
  if (result.isPending) return { status: "loading" };
  if (result.isError)
    return { status: "error", error: extractErrorMessage(result.error, "Erro ao carregar dados") };
  return { status: "success", data: result.data as T };
}

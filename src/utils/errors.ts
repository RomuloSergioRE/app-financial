import axios from "axios";

export function extractErrorMessage(
  err: unknown,
  defaultMessage: string
): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data as Record<string, unknown>;
    if (typeof data.error === "string") return data.error;
    if (typeof data.message === "string") return data.message;
  }
  console.error("Erro não tratado:", err);
  return defaultMessage;
}

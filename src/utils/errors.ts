import axios from "axios";

export function extractErrorMessage(
  err: unknown,
  defaultMessage: string
): string {
  if (axios.isAxiosError(err) && err.response?.data?.error) {
    return err.response.data.error;
  }
  console.error("Erro não tratado:", err);
  return defaultMessage;
}

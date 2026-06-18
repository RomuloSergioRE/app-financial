export function formatCurrency(value: number, currency = "BRL", locale = "pt-BR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(value: string | Date, locale = "pt-BR"): string {
  return new Intl.DateTimeFormat(locale).format(
    typeof value === "string" ? new Date(value) : value,
  );
}

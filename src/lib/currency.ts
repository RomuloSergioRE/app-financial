export function fromCents(cents: number): number {
  return cents / 100;
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

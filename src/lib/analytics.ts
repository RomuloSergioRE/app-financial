export function calcChange(current: number, previous?: number): number | undefined {
  if (previous === undefined || previous === null) return undefined;
  if (previous === 0 && current > 0) return 100;
  if (previous === 0 && current === 0) return undefined;

  if (previous < 0) {
    if (current >= 0) return 100;
    return ((Math.abs(previous) - Math.abs(current)) / Math.abs(previous)) * 100;
  }

  return ((current - previous) / previous) * 100;
}

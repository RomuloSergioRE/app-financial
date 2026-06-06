export function calcChange(current: number, previous?: number): number | undefined {
  if (previous === undefined || previous === null) return undefined;

  if (previous === 0) {
    if (current === 0) return 0;
    return current > 0 ? 100 : -100;
  }

  return ((current - previous) / Math.abs(previous)) * 100;
}

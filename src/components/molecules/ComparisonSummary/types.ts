export interface ComparisonSummaryProps {
  currentPeriod: string;
  previousPeriod: string;
  incomeChange: number | null;
  outcomeChange: number | null;
  netChange: number | null;
  currentIncome: number;
  currentOutcome: number;
  currentNet: number;
}

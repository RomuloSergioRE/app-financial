export interface MonthlySeriesChartProps {
  data: {
    month: string;
    totalIncome: number;
    totalOutcome: number;
    netBalance: number;
  }[];
}

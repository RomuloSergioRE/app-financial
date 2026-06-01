export type SummaryType = "income" | "outcome" | "balance";

export interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: SummaryType;
  index?: number;
}

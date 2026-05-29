export type Period = "week" | "month" | "year";

export interface PeriodFilterProps {
  value: Period;
  onChange: (period: Period) => void;
}

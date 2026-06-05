export interface TopCategoriesChartProps {
  data: {
    categoryName: string;
    totalAmount: number;
    percentage: number;
    color?: string | null;
  }[];
}

export interface EarningsData {
  month: string;
  earnings: number;
  jobs: number;
}

export interface PerformanceMetric {
  label: string;
  labelAr: string;
  value: number | string;
  change: number;
  unit?: string;
}

export interface RevenueCategory {
  name: string;
  nameAr: string;
  value: number;
  color: string;
}

export interface CompletionData {
  category: string;
  categoryAr: string;
  completed: number;
  total: number;
}

export type DateRange = '7d' | '30d' | '90d' | '1y';

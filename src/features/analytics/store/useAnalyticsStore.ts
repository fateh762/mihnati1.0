import { create } from 'zustand';
import { EarningsData, PerformanceMetric, RevenueCategory, CompletionData, DateRange } from '../types';

const mockEarnings: EarningsData[] = [
  { month: 'Aug 2025', earnings: 1200, jobs: 8 },
  { month: 'Sep 2025', earnings: 1800, jobs: 12 },
  { month: 'Oct 2025', earnings: 1400, jobs: 10 },
  { month: 'Nov 2025', earnings: 2200, jobs: 15 },
  { month: 'Dec 2025', earnings: 1900, jobs: 13 },
  { month: 'Jan 2026', earnings: 2800, jobs: 18 },
];

const mockMetrics: PerformanceMetric[] = [
  { label: 'Total Earnings', labelAr: 'إجمالي الأرباح', value: 11300, change: 12.5, unit: 'SAR' },
  { label: 'Jobs Completed', labelAr: 'الوظائف المنجزة', value: 76, change: 8.3 },
  { label: 'Avg Rating', labelAr: 'متوسط التقييم', value: '4.8', change: 0.2 },
  { label: 'Response Rate', labelAr: 'معدل الاستجابة', value: '94%', change: 3.1 },
];

const mockRevenue: RevenueCategory[] = [
  { name: 'Plumbing', nameAr: 'سباكة', value: 4200, color: '#14b8a6' },
  { name: 'Electrical', nameAr: 'كهرباء', value: 3100, color: '#6366f1' },
  { name: 'AC Repair', nameAr: 'تكييف', value: 2500, color: '#f59e0b' },
  { name: 'Painting', nameAr: 'دهانات', value: 1500, color: '#ec4899' },
];

const mockCompletion: CompletionData[] = [
  { category: 'Plumbing', categoryAr: 'سباكة', completed: 28, total: 30 },
  { category: 'Electrical', categoryAr: 'كهرباء', completed: 20, total: 22 },
  { category: 'AC Repair', categoryAr: 'تكييف', completed: 15, total: 17 },
  { category: 'Painting', categoryAr: 'دهانات', completed: 10, total: 11 },
];

interface AnalyticsState {
  earningsData: EarningsData[];
  metrics: PerformanceMetric[];
  revenueCategories: RevenueCategory[];
  completionData: CompletionData[];
  dateRange: DateRange;
  isLoading: boolean;
  setDateRange: (range: DateRange) => void;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  earningsData: mockEarnings,
  metrics: mockMetrics,
  revenueCategories: mockRevenue,
  completionData: mockCompletion,
  dateRange: '30d',
  isLoading: false,

  setDateRange: (dateRange) => set({ dateRange }),

  fetchAnalytics: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 500));
    set({ isLoading: false });
  },
}));

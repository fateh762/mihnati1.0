import { useEffect } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import EarningsChart from '../components/EarningsChart';
import PerformanceMetrics from '../components/PerformanceMetrics';
import RevenueBreakdown from '../components/RevenueBreakdown';
import CompletionRates from '../components/CompletionRates';
import { DateRange } from '../types';

const ranges: { key: DateRange; label: string }[] = [
  { key: '7d', label: '7D' },
  { key: '30d', label: '30D' },
  { key: '90d', label: '90D' },
  { key: '1y', label: '1Y' },
];

export default function AnalyticsPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { fetchAnalytics, dateRange, setDateRange } = useAnalyticsStore();

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{isAr ? 'التحليلات' : 'Analytics'}</h1>
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {ranges.map(r => (
              <button
                key={r.key}
                onClick={() => setDateRange(r.key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${dateRange === r.key ? 'bg-teal-500 text-white' : 'text-slate-400'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </motion.div>

        <PerformanceMetrics />
        <EarningsChart />
        <RevenueBreakdown />
        <CompletionRates />
      </div>
    </MobileLayout>
  );
}

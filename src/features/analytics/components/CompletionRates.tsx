import { motion } from 'framer-motion';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useStore } from '@/store/useStore';

export default function CompletionRates() {
  const { completionData } = useAnalyticsStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <div className="glass p-4 rounded-2xl border-white/5 space-y-3">
      <h3 className="text-white font-semibold text-sm">{isAr ? 'معدلات الإنجاز' : 'Completion Rates'}</h3>
      {completionData.map((item, i) => {
        const pct = Math.round((item.completed / item.total) * 100);
        return (
          <div key={item.category} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-xs">{isAr ? item.categoryAr : item.category}</span>
              <span className="text-teal-400 text-xs font-medium">{pct}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full bg-teal-400 rounded-full"
              />
            </div>
            <p className="text-slate-500 text-xs">{item.completed}/{item.total} {isAr ? 'مكتمل' : 'completed'}</p>
          </div>
        );
      })}
    </div>
  );
}

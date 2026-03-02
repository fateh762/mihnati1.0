import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useStore } from '@/store/useStore';

export default function PerformanceMetrics() {
  const { metrics } = useAnalyticsStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-4 rounded-2xl border-white/5 space-y-1"
        >
          <p className="text-slate-400 text-xs">{isAr ? m.labelAr : m.label}</p>
          <p className="text-white text-xl font-bold">
            {m.value}{m.unit ? ` ${m.unit}` : ''}
          </p>
          <div className={`flex items-center gap-1 text-xs ${m.change >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
            {m.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(m.change)}% {isAr ? 'من الشهر السابق' : 'from last month'}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

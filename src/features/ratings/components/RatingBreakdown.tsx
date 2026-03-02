import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { RatingBreakdown as RatingBreakdownType } from '../types';
import { useStore } from '@/store/useStore';

export default function RatingBreakdown({ breakdown }: { breakdown: RatingBreakdownType }) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const stars = [5, 4, 3, 2, 1] as const;

  return (
    <div className="glass p-4 rounded-2xl border-white/5 space-y-3">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">{breakdown.average.toFixed(1)}</p>
          <div className="flex items-center gap-0.5 mt-1">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-3 h-3 ${s <= Math.round(breakdown.average) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-1">{breakdown.total} {isAr ? 'تقييم' : 'reviews'}</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {stars.map(star => {
            const count = breakdown.distribution[star];
            const pct = breakdown.total > 0 ? (count / breakdown.total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-slate-500 text-xs w-3">{star}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: star * 0.1 }}
                    className="h-full bg-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-slate-500 text-xs w-4">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

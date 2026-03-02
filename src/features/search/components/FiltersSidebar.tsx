import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';
import { useStore } from '@/store/useStore';

const categories = ['Plumbing', 'Electrical', 'Painting', 'AC', 'Carpentry', 'Cleaning'];
const categoriesAr = ['سباكة', 'كهرباء', 'دهانات', 'تكييف', 'نجارة', 'تنظيف'];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FiltersSidebar({ open, onClose }: Props) {
  const { filters, setFilters, clearFilters, search } = useSearchStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  const apply = () => { search(); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-white/5 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-teal-400" />
                <h2 className="text-white font-semibold">{isAr ? 'الفلاتر' : 'Filters'}</h2>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <label className="text-slate-400 text-xs mb-2 block">{isAr ? 'الفئة' : 'Category'}</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, i) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ category: filters.category === cat ? undefined : cat })}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors ${filters.category === cat ? 'bg-teal-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      {isAr ? categoriesAr[i] : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs mb-2 block">{isAr ? 'نطاق السعر (ر.س)' : 'Price Range (SAR)'}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice ?? ''}
                    onChange={e => setFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500/50"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice ?? ''}
                    onChange={e => setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs mb-2 block">{isAr ? 'الموقع' : 'Location'}</label>
                <input
                  value={filters.location ?? ''}
                  onChange={e => setFilters({ location: e.target.value || undefined })}
                  placeholder={isAr ? 'المدينة' : 'City'}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-500/50"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs mb-2 block">{isAr ? 'الحد الأدنى للتقييم' : 'Min Rating'}</label>
                <div className="flex gap-2">
                  {[3, 4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setFilters({ minRating: filters.minRating === r ? undefined : r })}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors ${filters.minRating === r ? 'bg-teal-500 text-white' : 'bg-white/5 text-slate-400'}`}
                    >
                      ⭐ {r}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 flex gap-3 border-t border-white/5">
              <button onClick={clearFilters} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:bg-white/5">
                {isAr ? 'مسح' : 'Clear'}
              </button>
              <button onClick={apply} className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium">
                {isAr ? 'تطبيق' : 'Apply'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

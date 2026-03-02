import { motion } from 'framer-motion';
import { Bookmark, Trash2, Search } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';
import { useStore } from '@/store/useStore';

export default function SavedSearches() {
  const { savedSearches, deleteSavedSearch, setQuery, search } = useSearchStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  if (savedSearches.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">{isAr ? 'عمليات البحث المحفوظة' : 'Saved Searches'}</h3>
      {savedSearches.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass p-3 rounded-xl border-white/5 flex items-center gap-3"
        >
          <Bookmark className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <button
            className="flex-1 text-left text-sm text-slate-300 hover:text-white transition-colors truncate"
            onClick={() => { setQuery(s.query); search(); }}
          >
            {s.query || (isAr ? 'بحث بدون نص' : 'Empty search')}
            {s.filters.category && <span className="text-teal-400 ml-2 text-xs">• {s.filters.category}</span>}
          </button>
          <button onClick={() => deleteSavedSearch(s.id)} className="text-slate-600 hover:text-red-400 flex-shrink-0">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}

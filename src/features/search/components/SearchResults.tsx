import { motion } from 'framer-motion';
import { Star, MapPin, Tag, LayoutGrid, List } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';
import { useStore } from '@/store/useStore';

export default function SearchResults() {
  const { results, isLoading, viewMode, toggleViewMode } = useSearchStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">{results.length} {isAr ? 'نتيجة' : 'results'}</p>
        <button onClick={toggleViewMode} className="p-1.5 text-slate-400 hover:text-teal-400 transition-colors">
          {viewMode === 'list' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
        </button>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        {results.map((result, i) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-4 rounded-2xl border-white/5 cursor-pointer hover:border-teal-500/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-400 text-sm font-bold">{(isAr ? result.titleAr : result.title).charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white text-sm font-medium truncate">{isAr ? result.titleAr : result.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${result.type === 'worker' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {result.type === 'worker' ? (isAr ? 'عامل' : 'Worker') : (isAr ? 'وظيفة' : 'Job')}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5 truncate">{isAr ? result.subtitleAr : result.subtitle}</p>
                <div className="flex items-center gap-3 mt-2">
                  {result.rating && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" /> {result.rating}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" /> {result.location}
                  </span>
                  {result.price && (
                    <span className="text-xs text-teal-400 font-medium ml-auto">{result.price} SAR</span>
                  )}
                </div>
                {viewMode === 'list' && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {result.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 text-xs bg-white/5 text-slate-500 px-2 py-0.5 rounded-full">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">{isAr ? 'لا توجد نتائج' : 'No results found'}</p>
        </div>
      )}
    </div>
  );
}

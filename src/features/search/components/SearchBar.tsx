import { useState, useRef, useEffect } from 'react';
import { Search, X, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchStore } from '../store/useSearchStore';
import { useStore } from '@/store/useStore';

const suggestions = ['plumber', 'electrician', 'painter', 'AC repair', 'tiling', 'سباك', 'كهربائي', 'دهان'];

export default function SearchBar() {
  const { query, setQuery, search, saveSearch } = useSearchStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = query
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions.slice(0, 5);

  const handleSelect = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    search();
  };

  useEffect(() => {
    const timer = setTimeout(() => { if (query) search(); }, 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={isAr ? 'ابحث عن خدمة أو عامل...' : 'Search for service or worker...'}
          className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(''); setShowSuggestions(false); }} className="text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
        <button onClick={saveSearch} className="text-slate-500 hover:text-teal-400 transition-colors" title="Save search">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-xl overflow-hidden z-50"
          >
            {filteredSuggestions.map(s => (
              <button
                key={s}
                onMouseDown={() => handleSelect(s)}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
              >
                <Search className="w-3 h-3 text-slate-500" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

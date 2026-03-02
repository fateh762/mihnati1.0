import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import SearchBar from '../components/SearchBar';
import FiltersSidebar from '../components/FiltersSidebar';
import SearchResults from '../components/SearchResults';
import SavedSearches from '../components/SavedSearches';
import { useSearchStore } from '../store/useSearchStore';

export default function SearchPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { search, results, savedSearches } = useSearchStore();

  useEffect(() => { search(); }, [search]);

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white">
          {isAr ? 'البحث' : 'Search'}
        </motion.h1>

        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            className="glass p-3 rounded-xl border-white/5 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {savedSearches.length > 0 && results.length === 0 && <SavedSearches />}
        <SearchResults />
      </div>
      <FiltersSidebar open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </MobileLayout>
  );
}

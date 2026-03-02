import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'plumbing', labelAr: 'سباكة', labelEn: 'Plumbing' },
  { id: 'electrical', labelAr: 'كهرباء', labelEn: 'Electrical' },
  { id: 'ac', labelAr: 'تكييف', labelEn: 'AC' },
  { id: 'cleaning', labelAr: 'تنظيف', labelEn: 'Cleaning' },
  { id: 'carpentry', labelAr: 'نجارة', labelEn: 'Carpentry' },
];

const sortOptions = [
  { value: 'newest', labelAr: 'الأحدث', labelEn: 'Newest' },
  { value: 'price_low', labelAr: 'السعر: الأقل', labelEn: 'Price: Low' },
  { value: 'price_high', labelAr: 'السعر: الأعلى', labelEn: 'Price: High' },
  { value: 'distance', labelAr: 'الأقرب', labelEn: 'Nearest' },
];

const SearchFilters = () => {
  const { language } = useStore();
  const { jobs } = useJobStore();
  const isAr = language === 'ar';

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const toggleSaved = (id: string) => {
    setSavedJobs((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const filtered = jobs.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesPrice =
      !job.price || (job.price >= priceRange[0] && job.price <= priceRange[1]);
    return matchesQuery && matchesCategory && matchesPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="p-6 space-y-4 sticky top-0 z-20 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isAr ? 'البحث المتقدم' : 'Advanced Search'}
          </h1>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-teal-500/50"
                placeholder={isAr ? 'ابحث عن مهام...' : 'Search jobs...'}
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  onClick={() => setQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filters Sheet */}
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-white/5 glass text-slate-400 hover:text-teal-400">
                  <SlidersHorizontal size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-[#0a0f1a] border-white/10 rounded-t-3xl pb-8">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-white font-black">
                    {isAr ? 'فلاتر البحث' : 'Search Filters'}
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-black text-white">
                      {isAr ? `نطاق السعر: ${priceRange[0]} - ${priceRange[1]} SAR` : `Price Range: ${priceRange[0]} - ${priceRange[1]} SAR`}
                    </Label>
                    <Slider
                      min={0}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="text-teal-500"
                    />
                  </div>

                  {/* Sort */}
                  <div className="space-y-3">
                    <Label className="text-sm font-black text-white">
                      {isAr ? 'الترتيب' : 'Sort By'}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setSortBy(opt.value)}
                          className={cn(
                            'px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                            sortBy === opt.value
                              ? 'bg-teal-500 text-white'
                              : 'glass border-white/5 text-slate-400 hover:text-white'
                          )}
                        >
                          {isAr ? opt.labelAr : opt.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 rounded-2xl h-12 font-black"
                    onClick={() => setFilterSheetOpen(false)}
                  >
                    {isAr ? 'تطبيق الفلاتر' : 'Apply Filters'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all',
                  selectedCategory === cat.id
                    ? 'bg-teal-500 text-white shadow-[0_0_12px_rgba(20,184,166,0.4)]'
                    : 'glass border-white/5 text-slate-400 hover:text-white'
                )}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </header>

        {/* Results */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              {sorted.length} {isAr ? 'نتيجة' : 'results'}
            </p>
            {savedJobs.length > 0 && (
              <Badge className="bg-teal-500/10 text-teal-400 border-none text-xs">
                <Bookmark size={10} className="mr-1" />
                {savedJobs.length} {isAr ? 'محفوظ' : 'saved'}
              </Badge>
            )}
          </div>

          {sorted.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Search size={28} className="text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">
                {isAr ? 'لا توجد نتائج' : 'No results found'}
              </p>
            </div>
          ) : (
            sorted.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-5 rounded-[2rem] border-white/5 hover:border-teal-500/30 transition-all space-y-4 group"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-black uppercase">
                        {job.category}
                      </Badge>
                    </div>
                    <h3 className="font-black text-white text-base truncate group-hover:text-teal-400 transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleSaved(job.id)}
                      className="text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkCheck size={18} className="text-teal-400" />
                      ) : (
                        <Bookmark size={18} />
                      )}
                    </button>
                    <div className="text-right">
                      <div className="text-teal-400 font-black">
                        {job.priceType === 'fixed' ? `${job.price} SAR` : isAr ? 'مزايدة' : 'Bid'}
                      </div>
                      <p className="text-[10px] text-slate-500">{job.bidsCount} {isAr ? 'عروض' : 'bids'}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-teal-500" />
                      {job.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-teal-500" />
                      {isAr ? 'منذ 5 دقائق' : '5m ago'}
                    </span>
                  </div>
                  <Link
                    to={`/worker/job/${job.id}`}
                    className="flex items-center gap-1 text-teal-400 text-xs font-black"
                  >
                    {isAr ? 'التفاصيل' : 'Details'}
                    {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default SearchFilters;

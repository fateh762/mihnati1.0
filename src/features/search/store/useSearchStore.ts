import { create } from 'zustand';
import { generateId } from '@/lib/utils';
import { SearchFilters, SearchResult, SavedSearch } from '../types';

const mockResults: SearchResult[] = [
  { id: '1', type: 'worker', title: 'Ahmed Al-Plumber', titleAr: 'أحمد السباك', subtitle: 'Professional plumber with 8 years experience', subtitleAr: 'سباك محترف بخبرة 8 سنوات', price: 120, rating: 4.8, location: 'Riyadh', tags: ['plumbing', 'pipes', 'fixtures'] },
  { id: '2', type: 'worker', title: 'Mohammed Electrician', titleAr: 'محمد الكهربائي', subtitle: 'Certified electrician for residential & commercial', subtitleAr: 'كهربائي معتمد للمنازل والمحلات', price: 150, rating: 4.6, location: 'Jeddah', tags: ['electrical', 'wiring', 'panels'] },
  { id: '3', type: 'job', title: 'AC Repair Needed', titleAr: 'مطلوب إصلاح مكيف', subtitle: 'My AC unit is not cooling properly', subtitleAr: 'مكيفي لا يبرد بشكل صحيح', price: 200, rating: undefined, location: 'Dammam', tags: ['ac', 'cooling', 'hvac'] },
  { id: '4', type: 'worker', title: 'Khalid Painter', titleAr: 'خالد الدهان', subtitle: 'Interior & exterior painting specialist', subtitleAr: 'متخصص في الدهانات الداخلية والخارجية', price: 80, rating: 4.9, location: 'Riyadh', tags: ['painting', 'interior', 'exterior'] },
  { id: '5', type: 'job', title: 'Tiling Work Required', titleAr: 'مطلوب بلاط', subtitle: 'Bathroom tiling for 3 bathrooms', subtitleAr: 'بلاط حمامات لـ3 حمامات', price: 500, rating: undefined, location: 'Riyadh', tags: ['tiling', 'bathroom', 'renovation'] },
];

interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  savedSearches: SavedSearch[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  setQuery: (q: string) => void;
  setFilters: (f: Partial<SearchFilters>) => void;
  search: () => Promise<void>;
  saveSearch: () => void;
  deleteSavedSearch: (id: string) => void;
  toggleViewMode: () => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  filters: {},
  results: [],
  savedSearches: [],
  isLoading: false,
  viewMode: 'list',

  setQuery: (query) => set({ query }),
  setFilters: (f) => set(s => ({ filters: { ...s.filters, ...f } })),
  clearFilters: () => set({ filters: {} }),
  toggleViewMode: () => set(s => ({ viewMode: s.viewMode === 'grid' ? 'list' : 'grid' })),

  search: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 600));
    const { query, filters } = get();
    let filtered = mockResults;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.titleAr.includes(q) || r.tags.some(t => t.includes(q)));
    }
    if (filters.minRating) filtered = filtered.filter(r => (r.rating ?? 0) >= (filters.minRating ?? 0));
    if (filters.maxPrice) filtered = filtered.filter(r => (r.price ?? 0) <= (filters.maxPrice ?? Infinity));
    if (filters.minPrice) filtered = filtered.filter(r => (r.price ?? 0) >= (filters.minPrice ?? 0));
    set({ results: filtered, isLoading: false });
  },

  saveSearch: () => {
    const { query, filters } = get();
    const newSearch: SavedSearch = { id: generateId(), query, filters, createdAt: new Date().toISOString() };
    set(s => ({ savedSearches: [newSearch, ...s.savedSearches] }));
  },

  deleteSavedSearch: (id) => set(s => ({ savedSearches: s.savedSearches.filter(s => s.id !== id) })),
}));

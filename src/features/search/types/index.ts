import { ID } from '@/shared/types';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  minRating?: number;
  availability?: 'now' | 'today' | 'week';
}

export interface SearchResult {
  id: ID;
  type: 'worker' | 'job';
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  price?: number;
  rating?: number;
  location: string;
  avatar?: string;
  tags: string[];
}

export interface SavedSearch {
  id: ID;
  query: string;
  filters: SearchFilters;
  createdAt: string;
}

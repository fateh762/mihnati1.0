import { create } from 'zustand';
import { MediaFile, PortfolioItem } from '../types';

const mockMedia: MediaFile[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', name: 'plumbing-1.jpg', size: 245000, type: 'image', category: 'plumbing', uploadedAt: '2024-01-15' },
  { id: '2', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', name: 'electrical-1.jpg', size: 312000, type: 'image', category: 'electrical', uploadedAt: '2024-01-12' },
  { id: '3', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', name: 'painting-1.jpg', size: 198000, type: 'image', category: 'painting', uploadedAt: '2024-01-10' },
];

const mockPortfolio: PortfolioItem[] = [
  { id: '1', title: 'Bathroom Renovation', titleAr: 'تجديد الحمام', description: 'Complete bathroom plumbing overhaul', images: [mockMedia[0]], category: 'plumbing', createdAt: '2024-01-15' },
  { id: '2', title: 'Kitchen Electrical', titleAr: 'كهرباء المطبخ', description: 'Full kitchen rewiring', images: [mockMedia[1]], category: 'electrical', createdAt: '2024-01-12' },
];

interface MediaState {
  files: MediaFile[];
  portfolio: PortfolioItem[];
  isLoading: boolean;
  previewFile: MediaFile | null;
  addFiles: (files: MediaFile[]) => void;
  deleteFile: (id: string) => void;
  setPreview: (file: MediaFile | null) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => void;
  deletePortfolioItem: (id: string) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  files: mockMedia,
  portfolio: mockPortfolio,
  isLoading: false,
  previewFile: null,

  addFiles: (files) => set(s => ({ files: [...s.files, ...files] })),

  deleteFile: (id) => set(s => ({ files: s.files.filter(f => f.id !== id) })),

  setPreview: (file) => set({ previewFile: file }),

  addPortfolioItem: (item) => set(s => ({
    portfolio: [{ ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...s.portfolio],
  })),

  deletePortfolioItem: (id) => set(s => ({ portfolio: s.portfolio.filter(p => p.id !== id) })),
}));

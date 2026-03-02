import { ID } from '@/shared/types';

export type MediaType = 'image' | 'video';

export interface MediaFile {
  id: ID;
  url: string;
  thumbnail?: string;
  name: string;
  size: number;
  type: MediaType;
  category?: string;
  uploadedAt: string;
}

export interface PortfolioItem {
  id: ID;
  title: string;
  titleAr: string;
  description: string;
  images: MediaFile[];
  category: string;
  createdAt: string;
}

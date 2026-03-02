import { ID } from '@/shared/types';

export interface Review {
  id: ID;
  authorId: ID;
  authorName: string;
  authorAvatar?: string;
  workerId: ID;
  jobId: ID;
  rating: number;
  comment: string;
  commentAr: string;
  createdAt: string;
  isVerified: boolean;
}

export interface RatingBreakdown {
  total: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

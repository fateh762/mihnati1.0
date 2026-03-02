import { create } from 'zustand';
import { generateId } from '@/lib/utils';
import { Review, RatingBreakdown } from '../types';

const mockReviews: Review[] = [
  { id: '1', authorId: 'u1', authorName: 'Ahmed Al-Rashid', workerId: 'w1', jobId: 'j1', rating: 5, comment: 'Excellent work, very professional!', commentAr: 'عمل ممتاز، محترف جداً!', createdAt: '2024-01-15T10:00:00Z', isVerified: true },
  { id: '2', authorId: 'u2', authorName: 'Sara Mohammed', workerId: 'w1', jobId: 'j2', rating: 4, comment: 'Good job, came on time.', commentAr: 'عمل جيد، جاء في الوقت المحدد.', createdAt: '2024-01-10T09:00:00Z', isVerified: true },
  { id: '3', authorId: 'u3', authorName: 'Khalid Ibrahim', workerId: 'w1', jobId: 'j3', rating: 5, comment: 'Highly recommended!', commentAr: 'أنصح به بشدة!', createdAt: '2024-01-05T14:00:00Z', isVerified: false },
  { id: '4', authorId: 'u4', authorName: 'Fatima Ali', workerId: 'w1', jobId: 'j4', rating: 3, comment: 'Average service, could be better.', commentAr: 'خدمة متوسطة، يمكن أن تكون أفضل.', createdAt: '2023-12-28T11:00:00Z', isVerified: true },
];

const mockBreakdown: RatingBreakdown = {
  total: 4,
  average: 4.25,
  distribution: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 2 },
};

interface RatingState {
  reviews: Review[];
  breakdown: RatingBreakdown;
  isLoading: boolean;
  submitReview: (review: Omit<Review, 'id' | 'createdAt' | 'isVerified'>) => Promise<void>;
}

export const useRatingStore = create<RatingState>((set) => ({
  reviews: mockReviews,
  breakdown: mockBreakdown,
  isLoading: false,

  submitReview: async (review) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 800));
    const newReview: Review = { ...review, id: generateId(), createdAt: new Date().toISOString(), isVerified: true };
    set(s => ({
      reviews: [newReview, ...s.reviews],
      isLoading: false,
      breakdown: {
        ...s.breakdown,
        total: s.breakdown.total + 1,
        average: (s.breakdown.average * s.breakdown.total + review.rating) / (s.breakdown.total + 1),
        distribution: { ...s.breakdown.distribution, [review.rating as 1|2|3|4|5]: s.breakdown.distribution[review.rating as 1|2|3|4|5] + 1 },
      },
    }));
  },
}));

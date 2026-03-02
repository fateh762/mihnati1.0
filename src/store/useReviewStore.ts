import { create } from 'zustand';

export interface ReviewCategory {
  communication: number;
  professionalism: number;
  quality: number;
  punctuality: number;
}

export interface Review {
  id: string;
  jobId: string;
  workerId: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  categories: ReviewCategory;
  comment: string;
  photos?: string[];
  verified: boolean;
  createdAt: string;
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  getWorkerRating: (workerId: string) => number;
  getWorkerReviews: (workerId: string) => Review[];
}

const sampleReviews: Review[] = [
  {
    id: 'r1',
    jobId: '1',
    workerId: 'w1',
    clientId: 'c1',
    clientName: 'سارة الأحمد',
    clientAvatar: 'https://i.pravatar.cc/150?u=sara',
    rating: 5,
    categories: { communication: 5, professionalism: 5, quality: 5, punctuality: 4 },
    comment: 'عمل ممتاز! أصلح المشكلة بسرعة واحترافية عالية. سأتعامل معه مرة أخرى.',
    verified: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'r2',
    jobId: '2',
    workerId: 'w1',
    clientId: 'c2',
    clientName: 'محمد العتيبي',
    clientAvatar: 'https://i.pravatar.cc/150?u=mohammed',
    rating: 4,
    categories: { communication: 4, professionalism: 5, quality: 4, punctuality: 3 },
    comment: 'خدمة جيدة جداً، لكن التأخر قليلاً في الوصول.',
    verified: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'r3',
    jobId: '3',
    workerId: 'w1',
    clientId: 'c3',
    clientName: 'نورة العلي',
    clientAvatar: 'https://i.pravatar.cc/150?u=noura',
    rating: 5,
    categories: { communication: 5, professionalism: 5, quality: 5, punctuality: 5 },
    comment: 'ممتاز في كل شيء! نظيف ومحترف ودقيق في المواعيد.',
    verified: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
];

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: sampleReviews,
  addReview: (review) =>
    set((state) => ({ reviews: [review, ...state.reviews] })),
  getWorkerRating: (workerId) => {
    const reviews = get().reviews.filter((r) => r.workerId === workerId);
    if (!reviews.length) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  },
  getWorkerReviews: (workerId) =>
    get().reviews.filter((r) => r.workerId === workerId),
}));

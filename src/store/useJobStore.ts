import { create } from 'zustand';

export interface Job {
  id: string;
  clientId: string;
  category: string;
  title: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  priceType: 'fixed' | 'bidding';
  price?: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  distance?: string;
  bidsCount: number;
  time?: string;
}

interface JobState {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJobStatus: (id: string, status: Job['status']) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [
    {
      id: '1',
      clientId: 'c1',
      category: 'plumbing',
      title: 'إصلاح تسرب مياه في المطبخ',
      description: 'يوجد تسرب تحت المغسلة يحتاج لإصلاح فوري',
      location: { lat: 24.7136, lng: 46.6753, address: 'حي الملقا، الرياض' },
      priceType: 'fixed',
      price: 150,
      status: 'open',
      createdAt: new Date().toISOString(),
      distance: '2.5 km',
      bidsCount: 3
    },
    {
      id: '2',
      clientId: 'c2',
      category: 'ac',
      title: 'تنظيف مكيفات سبليت',
      description: 'تنظيف 4 مكيفات سبليت مع تعبئة فريون',
      location: { lat: 24.7742, lng: 46.7385, address: 'حي الياسمين، الرياض' },
      priceType: 'bidding',
      status: 'open',
      createdAt: new Date().toISOString(),
      distance: '5.1 km',
      bidsCount: 8
    }
  ],
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJobStatus: (id, status) => set((state) => ({
    jobs: state.jobs.map(j => j.id === id ? { ...j, status } : j)
  })),
}));
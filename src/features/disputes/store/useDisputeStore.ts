import { create } from 'zustand';
import { Dispute, DisputeReason } from '../types';

const mockDisputes: Dispute[] = [
  {
    id: '1',
    jobId: 'j1',
    jobTitle: 'Plumbing Repair',
    jobTitleAr: 'إصلاح السباكة',
    status: 'under_review',
    reason: 'incomplete_work',
    description: 'The worker did not complete all tasks agreed upon.',
    descriptionAr: 'لم يكمل العامل جميع المهام المتفق عليها.',
    amount: 200,
    evidence: [],
    timeline: [
      { id: 'e1', date: '2024-01-15T10:00:00Z', title: 'Dispute Filed', titleAr: 'تم رفع النزاع', description: 'Client filed a dispute', descriptionAr: 'رفع العميل نزاعاً', by: 'client' },
      { id: 'e2', date: '2024-01-16T09:00:00Z', title: 'Under Review', titleAr: 'قيد المراجعة', description: 'Admin started reviewing', descriptionAr: 'بدأ المشرف المراجعة', by: 'admin' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T09:00:00Z',
  },
];

interface DisputeState {
  disputes: Dispute[];
  isLoading: boolean;
  submitDispute: (data: { jobId: string; reason: DisputeReason; description: string; amount: number }) => Promise<void>;
  uploadEvidence: (disputeId: string, file: File) => Promise<void>;
}

export const useDisputeStore = create<DisputeState>((set) => ({
  disputes: mockDisputes,
  isLoading: false,

  submitDispute: async (data) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 1000));
    const newDispute: Dispute = {
      id: Date.now().toString(),
      ...data,
      jobTitle: 'Job #' + data.jobId,
      jobTitleAr: 'وظيفة #' + data.jobId,
      status: 'open',
      descriptionAr: data.description,
      evidence: [],
      timeline: [{ id: 'e0', date: new Date().toISOString(), title: 'Dispute Filed', titleAr: 'تم رفع النزاع', description: 'You filed a dispute', descriptionAr: 'قمت برفع نزاع', by: 'client' }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set(s => ({ disputes: [newDispute, ...s.disputes], isLoading: false }));
  },

  uploadEvidence: async (disputeId, file) => {
    await new Promise(r => setTimeout(r, 800));
    set(s => ({
      disputes: s.disputes.map(d => d.id === disputeId ? {
        ...d,
        evidence: [...d.evidence, { id: Date.now().toString(), name: file.name, url: URL.createObjectURL(file), type: 'image' }],
      } : d),
    }));
  },
}));

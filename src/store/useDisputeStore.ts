import { create } from 'zustand';

export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed' | 'appealed';
export type DisputeReason =
  | 'not_completed'
  | 'poor_quality'
  | 'no_show'
  | 'overcharge'
  | 'damage'
  | 'other';

export interface DisputeMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  attachments?: string[];
  createdAt: string;
}

export interface Dispute {
  id: string;
  jobId: string;
  jobTitleAr: string;
  jobTitleEn: string;
  clientId: string;
  workerId: string;
  filedBy: 'client' | 'worker';
  reason: DisputeReason;
  descriptionAr: string;
  descriptionEn: string;
  status: DisputeStatus;
  refundAmount?: number;
  evidence?: string[];
  messages: DisputeMessage[];
  createdAt: string;
  resolvedAt?: string;
}

interface DisputeState {
  disputes: Dispute[];
  addDispute: (dispute: Dispute) => void;
  updateDisputeStatus: (id: string, status: DisputeStatus) => void;
  addMessage: (disputeId: string, message: DisputeMessage) => void;
}

const sampleDisputes: Dispute[] = [
  {
    id: 'd1',
    jobId: '5',
    jobTitleAr: 'صيانة كهرباء',
    jobTitleEn: 'Electrical Maintenance',
    clientId: 'c4',
    workerId: 'w2',
    filedBy: 'client',
    reason: 'poor_quality',
    descriptionAr: 'لم يتم إنجاز العمل بالشكل المطلوب والمدفوع',
    descriptionEn: 'The work was not completed as required and paid for',
    status: 'under_review',
    refundAmount: 80,
    messages: [
      {
        id: 'm1',
        senderId: 'c4',
        senderName: 'العميل / Client',
        message: 'لم يتم إنجاز العمل كاملاً',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

export const useDisputeStore = create<DisputeState>((set) => ({
  disputes: sampleDisputes,
  addDispute: (dispute) =>
    set((state) => ({ disputes: [dispute, ...state.disputes] })),
  updateDisputeStatus: (id, status) =>
    set((state) => ({
      disputes: state.disputes.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          status,
          resolvedAt: status === 'resolved' ? new Date().toISOString() : d.resolvedAt,
        };
      }),
    })),
  addMessage: (disputeId, message) =>
    set((state) => ({
      disputes: state.disputes.map((d) =>
        d.id === disputeId ? { ...d, messages: [...d.messages, message] } : d
      ),
    })),
}));

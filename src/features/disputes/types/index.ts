import { ID } from '@/shared/types';

export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed';
export type DisputeReason = 'incomplete_work' | 'overcharge' | 'no_show' | 'quality' | 'other';

export interface DisputeEvidence {
  id: ID;
  name: string;
  url: string;
  type: 'image' | 'document';
}

export interface DisputeEvent {
  id: ID;
  date: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  by: 'client' | 'worker' | 'admin';
}

export interface Dispute {
  id: ID;
  jobId: ID;
  jobTitle: string;
  jobTitleAr: string;
  status: DisputeStatus;
  reason: DisputeReason;
  description: string;
  descriptionAr: string;
  amount: number;
  evidence: DisputeEvidence[];
  timeline: DisputeEvent[];
  createdAt: string;
  updatedAt: string;
}

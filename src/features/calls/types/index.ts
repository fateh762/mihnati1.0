import { ID } from '@/shared/types';

export type CallType = 'video' | 'voice';
export type CallStatus = 'scheduled' | 'active' | 'ended' | 'missed';

export interface Call {
  id: ID;
  type: CallType;
  status: CallStatus;
  participantId: ID;
  participantName: string;
  participantAvatar?: string;
  startedAt?: string;
  endedAt?: string;
  duration?: number;
  scheduledAt?: string;
}

export interface ScheduledCall {
  participantId: ID;
  participantName: string;
  type: CallType;
  scheduledAt: string;
  topic: string;
  topicAr: string;
}

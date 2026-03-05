import { create } from 'zustand';
import { generateId } from '@/lib/utils';
import { Call, CallType } from '../types';

const mockHistory: Call[] = [
  { id: '1', type: 'video', status: 'ended', participantId: 'u1', participantName: 'Ahmed Al-Rashid', startedAt: '2024-01-15T10:00:00Z', endedAt: '2024-01-15T10:25:00Z', duration: 25 },
  { id: '2', type: 'voice', status: 'missed', participantId: 'u2', participantName: 'Sara Mohammed', startedAt: '2024-01-14T14:30:00Z' },
  { id: '3', type: 'video', status: 'ended', participantId: 'u3', participantName: 'Khalid Ibrahim', startedAt: '2024-01-12T09:00:00Z', endedAt: '2024-01-12T09:45:00Z', duration: 45 },
  { id: '4', type: 'voice', status: 'ended', participantId: 'u1', participantName: 'Ahmed Al-Rashid', startedAt: '2024-01-10T16:00:00Z', endedAt: '2024-01-10T16:12:00Z', duration: 12 },
];

interface CallState {
  callHistory: Call[];
  activeCall: Call | null;
  isMuted: boolean;
  isVideoOff: boolean;
  startCall: (participantId: string, participantName: string, type: CallType) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  scheduleCall: (data: { participantId: string; participantName: string; type: CallType; scheduledAt: string; topic: string; topicAr: string }) => void;
}

export const useCallStore = create<CallState>((set, get) => ({
  callHistory: mockHistory,
  activeCall: null,
  isMuted: false,
  isVideoOff: false,

  startCall: (participantId, participantName, type) => {
    const call: Call = { id: generateId(), type, status: 'active', participantId, participantName, startedAt: new Date().toISOString() };
    set({ activeCall: call });
  },

  endCall: () => {
    const { activeCall } = get();
    if (!activeCall) return;
    const ended: Call = { ...activeCall, status: 'ended', endedAt: new Date().toISOString() };
    set(s => ({ activeCall: null, callHistory: [ended, ...s.callHistory], isMuted: false, isVideoOff: false }));
  },

  toggleMute: () => set(s => ({ isMuted: !s.isMuted })),
  toggleVideo: () => set(s => ({ isVideoOff: !s.isVideoOff })),

  scheduleCall: (data) => {
    const call: Call = { id: Date.now().toString(), ...data, status: 'scheduled', scheduledAt: data.scheduledAt };
    set(s => ({ callHistory: [call, ...s.callHistory] }));
  },
}));
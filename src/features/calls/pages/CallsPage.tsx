import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useCallStore } from '../store/useCallStore';
import CallHistory from '../components/CallHistory';
import CallScheduling from '../components/CallScheduling';
import VideoCallInterface from '../components/VideoCallInterface';
import VoiceCallInterface from '../components/VoiceCallInterface';
import { Video, Phone, Clock } from 'lucide-react';

type Tab = 'history' | 'schedule';

export default function CallsPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { activeCall, startCall } = useCallStore();
  const [tab, setTab] = useState<Tab>('history');

  const tabs = [
    { key: 'history' as Tab, label: isAr ? 'السجل' : 'History' },
    { key: 'schedule' as Tab, label: isAr ? 'جدولة' : 'Schedule' },
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white">
          {isAr ? 'المكالمات' : 'Calls'}
        </motion.h1>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => startCall('demo-1', 'Ahmed Al-Rashid', 'video')}
            className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-2 hover:bg-teal-500/10 transition-colors"
          >
            <div className="p-3 rounded-xl bg-teal-500/20">
              <Video className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-white text-sm">{isAr ? 'مكالمة فيديو' : 'Video Call'}</span>
          </button>
          <button
            onClick={() => startCall('demo-2', 'Sara Mohammed', 'voice')}
            className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-2 hover:bg-blue-500/10 transition-colors"
          >
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-white text-sm">{isAr ? 'مكالمة صوتية' : 'Voice Call'}</span>
          </button>
        </div>

        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-teal-500 text-white' : 'text-slate-400'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'history' && <CallHistory />}
        {tab === 'schedule' && (
          <div className="glass p-4 rounded-2xl border-white/5">
            <CallScheduling onScheduled={() => setTab('history')} />
          </div>
        )}
      </div>

      {activeCall?.type === 'video' && <VideoCallInterface />}
      {activeCall?.type === 'voice' && <VoiceCallInterface />}
    </MobileLayout>
  );
}

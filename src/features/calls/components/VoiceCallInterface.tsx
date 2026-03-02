import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';
import { useCallStore } from '../store/useCallStore';
import { useStore } from '@/store/useStore';

export default function VoiceCallInterface() {
  const { activeCall, endCall, toggleMute, isMuted } = useCallStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!activeCall) return;
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, [activeCall]);

  if (!activeCall) return null;

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-28 h-28 rounded-full bg-teal-500/20 border-4 border-teal-500/30 flex items-center justify-center"
        >
          <span className="text-teal-400 text-5xl font-bold">{activeCall.participantName.charAt(0)}</span>
        </motion.div>
        <div className="text-center">
          <p className="text-white text-2xl font-bold">{activeCall.participantName}</p>
          <p className="text-teal-400 text-lg font-mono mt-1">{fmt(elapsed)}</p>
          <p className="text-slate-500 text-sm">{isAr ? 'مكالمة صوتية' : 'Voice Call'}</p>
        </div>
      </div>

      <div className="absolute bottom-16 flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Volume2 className="w-6 h-6 text-white" />
          </button>
          <span className="text-slate-500 text-xs">{isAr ? 'صوت' : 'Speaker'}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button onClick={endCall} className="p-6 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
            <PhoneOff className="w-8 h-8 text-white" />
          </button>
          <span className="text-slate-500 text-xs">{isAr ? 'إنهاء' : 'End'}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button onClick={toggleMute} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>
            {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          <span className="text-slate-500 text-xs">{isMuted ? (isAr ? 'إلغاء الكتم' : 'Unmute') : (isAr ? 'كتم' : 'Mute')}</span>
        </div>
      </div>
    </motion.div>
  );
}

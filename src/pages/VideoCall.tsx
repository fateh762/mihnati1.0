import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

const VideoCall = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const isAr = language === 'ar';

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndCall = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-[#02040a] flex flex-col max-w-md mx-auto overflow-hidden">
      {/* Remote Video (simulated with gradient) */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-[#02040a]">
        {/* Remote participant placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {videoOn ? (
            <div className="w-full h-full bg-gradient-to-br from-teal-900/20 to-slate-900 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-teal-500/20 border-2 border-teal-500/30 flex items-center justify-center">
                <img
                  src="https://i.pravatar.cc/150?u=client"
                  alt="Remote"
                  className="w-full h-full rounded-full object-cover opacity-60"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">
                <img src="https://i.pravatar.cc/150?u=client" alt="Remote" className="w-full h-full rounded-full object-cover" />
              </div>
              <p className="text-white font-bold">سارة الأحمد</p>
              <p className="text-slate-400 text-sm">
                {isAr ? 'الكاميرا متوقفة' : 'Camera off'}
              </p>
            </div>
          )}
        </div>

        {/* Local video (PiP) */}
        <div className="absolute top-4 right-4 w-24 h-36 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
          <img
            src="https://i.pravatar.cc/150?u=worker"
            alt="Local"
            className="w-full h-full object-cover"
          />
          {!videoOn && (
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <VideoOff size={20} className="text-slate-500" />
            </div>
          )}
        </div>

        {/* Top info */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          <p className="text-white font-black text-sm">
            {isAr ? 'سارة الأحمد' : 'Sara Al-Ahmad'}
          </p>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <Clock size={11} />
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Screen sharing indicator */}
        {screenSharing && (
          <div className="absolute top-16 left-4 bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Monitor size={12} />
            {isAr ? 'مشاركة الشاشة' : 'Screen Sharing'}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-[#02040a]/90 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMicOn(!micOn)}
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
              micOn ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'
            )}
          >
            {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setVideoOn(!videoOn)}
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
              videoOn ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-400'
            )}
          >
            {videoOn ? <Video size={22} /> : <VideoOff size={22} />}
          </motion.button>

          {/* End Call */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleEndCall}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-colors"
          >
            <PhoneOff size={26} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setScreenSharing(!screenSharing)}
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
              screenSharing ? 'bg-teal-500/20 text-teal-400' : 'bg-white/10 text-white'
            )}
          >
            <Monitor size={22} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setChatOpen(!chatOpen)}
            className={cn(
              'w-14 h-14 rounded-full flex items-center justify-center transition-colors',
              chatOpen ? 'bg-teal-500/20 text-teal-400' : 'bg-white/10 text-white'
            )}
          >
            <MessageSquare size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;

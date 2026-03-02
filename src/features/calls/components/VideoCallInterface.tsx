import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, RotateCcw } from 'lucide-react';
import { useCallStore } from '../store/useCallStore';
import { useStore } from '@/store/useStore';

export default function VideoCallInterface() {
  const { activeCall, endCall, toggleMute, toggleVideo, isMuted, isVideoOff } = useCallStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  if (!activeCall) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-slate-900 z-50 flex flex-col"
    >
      {/* Remote video area */}
      <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
        <div className="w-24 h-24 rounded-full bg-teal-500/20 flex items-center justify-center">
          <span className="text-teal-400 text-4xl font-bold">{activeCall.participantName.charAt(0)}</span>
        </div>
        <p className="absolute bottom-8 text-white text-xl font-semibold">{activeCall.participantName}</p>
        <p className="absolute bottom-2 text-slate-400 text-sm">{isAr ? 'جارٍ الاتصال...' : 'Connecting...'}</p>

        {/* Local video pip */}
        <div className="absolute top-4 right-4 w-24 h-36 bg-slate-700 rounded-xl overflow-hidden border-2 border-white/10">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <VideoOff className="w-6 h-6 text-slate-500" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal-900 to-slate-800 flex items-center justify-center">
              <span className="text-teal-400 text-lg font-bold">You</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-6">
          <button onClick={toggleMute} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>
            {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          <button onClick={endCall} className="p-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
            <PhoneOff className="w-7 h-7 text-white" />
          </button>
          <button onClick={toggleVideo} className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>
            {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
            <RotateCcw className="w-5 h-5" />
            <span className="text-xs">{isAr ? 'تبديل' : 'Flip'}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">{isAr ? 'رسالة' : 'Chat'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Video, Phone, PhoneMissed, Clock } from 'lucide-react';
import { useCallStore } from '../store/useCallStore';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  ended: { icon: Phone, color: 'text-teal-400 bg-teal-500/20' },
  missed: { icon: PhoneMissed, color: 'text-red-400 bg-red-500/20' },
  scheduled: { icon: Clock, color: 'text-blue-400 bg-blue-500/20' },
  active: { icon: Phone, color: 'text-green-400 bg-green-500/20' },
};

export default function CallHistory() {
  const { callHistory, startCall } = useCallStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <div className="space-y-3">
      {callHistory.filter(c => c.status !== 'active').map((call, i) => {
        const { icon: Icon, color } = statusConfig[call.status];
        return (
          <motion.div
            key={call.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-4 rounded-2xl border-white/5 flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl ${color}`}>
              {call.type === 'video' ? <Video className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{call.participantName}</p>
              <p className="text-slate-500 text-xs">
                {call.startedAt ? formatDistanceToNow(new Date(call.startedAt), { addSuffix: true }) : call.scheduledAt}
                {call.duration && ` • ${call.duration}min`}
              </p>
            </div>
            <button
              onClick={() => startCall(call.participantId, call.participantName, call.type)}
              className={`p-2 rounded-xl ${call.type === 'video' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'} hover:opacity-80 transition-opacity`}
            >
              {call.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
            </button>
          </motion.div>
        );
      })}
      {callHistory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">{isAr ? 'لا توجد مكالمات' : 'No call history'}</p>
        </div>
      )}
    </div>
  );
}

import { motion } from 'framer-motion';
import { Briefcase, MessageSquare, CreditCard, Settings, Trash2 } from 'lucide-react';
import { Notification } from '../types';
import { useNotificationStore } from '../store/useNotificationStore';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';

const iconMap = {
  job: Briefcase,
  message: MessageSquare,
  payment: CreditCard,
  system: Settings,
};

const colorMap = {
  job: 'text-blue-400 bg-blue-500/20',
  message: 'text-teal-400 bg-teal-500/20',
  payment: 'text-green-400 bg-green-500/20',
  system: 'text-slate-400 bg-slate-500/20',
};

export default function NotificationCard({ notification }: { notification: Notification }) {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const Icon = iconMap[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass p-4 rounded-2xl border-white/5 flex items-start gap-3 ${!notification.isRead ? 'border-l-2 border-l-teal-500' : ''}`}
      onClick={() => markAsRead(notification.id)}
    >
      <div className={`p-2 rounded-xl flex-shrink-0 ${colorMap[notification.type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-medium ${notification.isRead ? 'text-slate-300' : 'text-white'}`}>
            {isAr ? notification.titleAr : notification.title}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
            className="text-slate-600 hover:text-red-400 flex-shrink-0"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
        <p className="text-slate-400 text-xs mt-0.5 truncate">{isAr ? notification.bodyAr : notification.body}</p>
        <p className="text-slate-600 text-xs mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
      {!notification.isRead && <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0 mt-1" />}
    </motion.div>
  );
}

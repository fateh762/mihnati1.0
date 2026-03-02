import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotificationStore } from '../store/useNotificationStore';
import { Link } from 'react-router-dom';

export default function NotificationBell() {
  const { unreadCount } = useNotificationStore();
  const count = unreadCount();

  return (
    <Link to="/notifications" className="relative p-2">
      <Bell className="w-6 h-6 text-slate-300" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </Link>
  );
}

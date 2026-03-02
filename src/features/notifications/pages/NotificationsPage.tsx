import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useNotificationStore } from '../store/useNotificationStore';
import NotificationCard from '../components/NotificationCard';
import NotificationFilter from '../components/NotificationFilter';
import NotificationPreferences from '../components/NotificationPreferences';
import { CheckCheck, Settings } from 'lucide-react';
import { NotificationType } from '../types';

type View = 'list' | 'settings';

export default function NotificationsPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { notifications, markAllAsRead } = useNotificationStore();
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [view, setView] = useState<View>('list');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{isAr ? 'الإشعارات' : 'Notifications'}</h1>
          <div className="flex gap-2">
            <button onClick={markAllAsRead} className="p-2 text-slate-400 hover:text-teal-400 transition-colors">
              <CheckCheck className="w-5 h-5" />
            </button>
            <button onClick={() => setView(v => v === 'list' ? 'settings' : 'list')} className={`p-2 transition-colors ${view === 'settings' ? 'text-teal-400' : 'text-slate-400'}`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {view === 'settings' ? (
          <NotificationPreferences />
        ) : (
          <>
            <NotificationFilter active={filter} onChange={setFilter} />
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">{isAr ? 'لا توجد إشعارات' : 'No notifications'}</p>
                </div>
              ) : (
                filtered.map(n => <NotificationCard key={n.id} notification={n} />)
              )}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}

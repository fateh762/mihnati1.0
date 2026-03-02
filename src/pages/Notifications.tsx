import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Check, CheckCheck, Trash2, MessageSquare, Briefcase, Star, CreditCard, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

const typeIcons = {
  bid: Briefcase,
  message: MessageSquare,
  job: Briefcase,
  review: Star,
  payment: CreditCard,
  dispute: AlertCircle,
};

const typeColors = {
  bid: 'bg-blue-500/10 text-blue-400',
  message: 'bg-purple-500/10 text-purple-400',
  job: 'bg-teal-500/10 text-teal-400',
  review: 'bg-amber-500/10 text-amber-400',
  payment: 'bg-emerald-500/10 text-emerald-400',
  dispute: 'bg-red-500/10 text-red-400',
};

const Notifications = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) navigate(link);
  };

  const formatTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), {
        addSuffix: true,
        locale: isAr ? ar : undefined,
      });
    } catch {
      return '';
    }
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isAr ? 'الإشعارات' : 'Notifications'}
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-teal-500 text-white border-none text-xs font-bold px-2 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center gap-1.5"
            >
              <CheckCheck size={14} />
              {isAr ? 'قراءة الكل' : 'Mark all read'}
            </Button>
          )}
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <BellOff size={36} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">
              {isAr ? 'لا توجد إشعارات' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {notifications.map((notification) => {
                const Icon = typeIcons[notification.type] || Bell;
                const colorClass = typeColors[notification.type] || 'bg-slate-500/10 text-slate-400';

                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: isAr ? 50 : -50 }}
                    className={cn(
                      'glass rounded-2xl p-4 border cursor-pointer transition-all',
                      notification.read
                        ? 'border-white/5 opacity-70'
                        : 'border-teal-500/20 bg-teal-500/5'
                    )}
                    onClick={() => handleNotificationClick(notification.id, notification.link)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2.5 rounded-xl flex-shrink-0', colorClass)}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="font-bold text-sm text-white truncate">
                            {isAr ? notification.titleAr : notification.titleEn}
                          </p>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-teal-400 rounded-full" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                          {isAr ? notification.bodyAr : notification.bodyEn}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-slate-500 font-medium">
                            {formatTime(notification.createdAt)}
                          </span>
                          {notification.link && (
                            <span className="text-teal-400">
                              {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Notifications;

import { create } from 'zustand';

export type NotificationType = 'bid' | 'message' | 'job' | 'review' | 'payment' | 'dispute';

export interface Notification {
  id: string;
  type: NotificationType;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  unreadCount: () => number;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'bid',
    titleAr: 'عرض جديد',
    titleEn: 'New Bid',
    bodyAr: 'تلقيت عرضاً جديداً على مهمة "إصلاح تسرب مياه"',
    bodyEn: 'You received a new bid on "Water Leak Repair"',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    link: '/client/job/1/bids',
  },
  {
    id: '2',
    type: 'payment',
    titleAr: 'تم استلام الدفعة',
    titleEn: 'Payment Received',
    bodyAr: 'تم إضافة 150 ريال إلى محفظتك',
    bodyEn: '150 SAR has been added to your wallet',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: '/worker/earnings',
  },
  {
    id: '3',
    type: 'message',
    titleAr: 'رسالة جديدة',
    titleEn: 'New Message',
    bodyAr: 'سارة الأحمد: هل يمكنك الحضور غداً الساعة 10؟',
    bodyEn: 'Sara Al-Ahmad: Can you come tomorrow at 10?',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    link: '/messages',
  },
  {
    id: '4',
    type: 'review',
    titleAr: 'تقييم جديد',
    titleEn: 'New Review',
    bodyAr: 'تلقيت تقييماً بـ 5 نجوم من سارة الأحمد',
    bodyEn: 'You received a 5-star review from Sara Al-Ahmad',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: '/worker/reviews',
  },
  {
    id: '5',
    type: 'job',
    titleAr: 'مهمة جديدة قريبة',
    titleEn: 'New Nearby Job',
    bodyAr: 'توجد مهمة جديدة في منطقتك: تنظيف مكيفات',
    bodyEn: 'New job in your area: AC Cleaning',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    link: '/worker/explore',
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: sampleNotifications,
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));

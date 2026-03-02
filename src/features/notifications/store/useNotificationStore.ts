import { create } from 'zustand';
import { Notification, NotificationPreference, NotificationType } from '../types';

const mockNotifications: Notification[] = [
  { id: '1', type: 'job', title: 'New Job Offer', titleAr: 'عرض وظيفة جديد', body: 'Ahmed wants to hire you for plumbing work', bodyAr: 'أحمد يريد تعيينك لعمل سباكة', isRead: false, createdAt: '2024-01-15T10:30:00Z' },
  { id: '2', type: 'payment', title: 'Payment Received', titleAr: 'تم استلام الدفعة', body: 'You received 250 SAR for your last job', bodyAr: 'استلمت 250 ريال مقابل آخر وظيفة', isRead: false, createdAt: '2024-01-14T15:00:00Z' },
  { id: '3', type: 'message', title: 'New Message', titleAr: 'رسالة جديدة', body: 'Sara: Are you available tomorrow?', bodyAr: 'سارة: هل أنت متاح غداً؟', isRead: true, createdAt: '2024-01-13T09:00:00Z' },
  { id: '4', type: 'system', title: 'Profile Verified', titleAr: 'تم التحقق من الملف', body: 'Your profile has been verified successfully', bodyAr: 'تم التحقق من ملفك الشخصي بنجاح', isRead: true, createdAt: '2024-01-12T08:00:00Z' },
  { id: '5', type: 'job', title: 'Job Completed', titleAr: 'تمت الوظيفة', body: 'Your job #1234 has been marked as complete', bodyAr: 'تم وضع علامة مكتملة على وظيفتك #1234', isRead: false, createdAt: '2024-01-11T14:00:00Z' },
];

const defaultPreferences: NotificationPreference[] = [
  { type: 'job', enabled: true, push: true, email: true },
  { type: 'message', enabled: true, push: true, email: false },
  { type: 'payment', enabled: true, push: true, email: true },
  { type: 'system', enabled: true, push: false, email: true },
];

interface NotificationState {
  notifications: Notification[];
  preferences: NotificationPreference[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  updatePreference: (type: NotificationType, field: keyof Omit<NotificationPreference, 'type'>, value: boolean) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  preferences: defaultPreferences,

  markAsRead: (id) => set(s => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
  })),

  markAllAsRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, isRead: true })),
  })),

  deleteNotification: (id) => set(s => ({
    notifications: s.notifications.filter(n => n.id !== id),
  })),

  updatePreference: (type, field, value) => set(s => ({
    preferences: s.preferences.map(p => p.type === type ? { ...p, [field]: value } : p),
  })),

  unreadCount: () => get().notifications.filter(n => !n.isRead).length,
}));

import { ID } from '@/shared/types';

export type NotificationType = 'job' | 'message' | 'payment' | 'system';

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  titleAr: string;
  body: string;
  bodyAr: string;
  isRead: boolean;
  createdAt: string;
  avatar?: string;
  actionUrl?: string;
}

export interface NotificationPreference {
  type: NotificationType;
  enabled: boolean;
  push: boolean;
  email: boolean;
}

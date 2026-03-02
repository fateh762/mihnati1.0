import { motion } from 'framer-motion';
import { useNotificationStore } from '../store/useNotificationStore';
import { useStore } from '@/store/useStore';
import { NotificationType } from '../types';

const labels: Record<NotificationType, { en: string; ar: string }> = {
  job: { en: 'Job Notifications', ar: 'إشعارات الوظائف' },
  message: { en: 'Message Notifications', ar: 'إشعارات الرسائل' },
  payment: { en: 'Payment Notifications', ar: 'إشعارات المدفوعات' },
  system: { en: 'System Notifications', ar: 'إشعارات النظام' },
};

export default function NotificationPreferences() {
  const { preferences, updatePreference } = useNotificationStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      <h3 className="text-white font-semibold text-sm">{isAr ? 'إعدادات الإشعارات' : 'Notification Settings'}</h3>
      {preferences.map(pref => (
        <div key={pref.type} className="glass p-4 rounded-2xl border-white/5 space-y-3">
          <p className="text-white text-sm font-medium">{isAr ? labels[pref.type].ar : labels[pref.type].en}</p>
          <div className="space-y-2">
            {(['enabled', 'push', 'email'] as const).map(field => (
              <div key={field} className="flex items-center justify-between">
                <span className="text-slate-400 text-xs capitalize">{field === 'enabled' ? (isAr ? 'مفعّل' : 'Enabled') : field === 'push' ? (isAr ? 'إشعار فوري' : 'Push') : (isAr ? 'بريد إلكتروني' : 'Email')}</span>
                <button
                  onClick={() => updatePreference(pref.type, field, !pref[field])}
                  className={`w-10 h-5 rounded-full transition-colors relative ${pref[field] ? 'bg-teal-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${pref[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

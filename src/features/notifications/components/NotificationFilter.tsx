import { NotificationType } from '../types';
import { useStore } from '@/store/useStore';

interface Props {
  active: 'all' | NotificationType;
  onChange: (v: 'all' | NotificationType) => void;
}

export default function NotificationFilter({ active, onChange }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';

  const filters: { key: 'all' | NotificationType; label: string; labelAr: string }[] = [
    { key: 'all', label: 'All', labelAr: 'الكل' },
    { key: 'job', label: 'Jobs', labelAr: 'الوظائف' },
    { key: 'message', label: 'Messages', labelAr: 'الرسائل' },
    { key: 'payment', label: 'Payments', labelAr: 'المدفوعات' },
    { key: 'system', label: 'System', labelAr: 'النظام' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${active === f.key ? 'bg-teal-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
          {isAr ? f.labelAr : f.label}
        </button>
      ))}
    </div>
  );
}

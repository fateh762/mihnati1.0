import { CheckCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function VerifiedBadge() {
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <span className="flex items-center gap-1 text-xs text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
      <CheckCircle className="w-3 h-3" />
      {isAr ? 'موثق' : 'Verified'}
    </span>
  );
}

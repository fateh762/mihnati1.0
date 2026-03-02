import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Dispute } from '../types';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  open: { icon: AlertTriangle, color: 'text-yellow-400 bg-yellow-500/20', label: 'Open', labelAr: 'مفتوح' },
  under_review: { icon: Clock, color: 'text-blue-400 bg-blue-500/20', label: 'Under Review', labelAr: 'قيد المراجعة' },
  resolved: { icon: CheckCircle, color: 'text-teal-400 bg-teal-500/20', label: 'Resolved', labelAr: 'محلول' },
  closed: { icon: XCircle, color: 'text-slate-400 bg-slate-500/20', label: 'Closed', labelAr: 'مغلق' },
};

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { icon: Icon, color, label, labelAr } = statusConfig[dispute.status];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-2xl border-white/5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-white font-medium text-sm">{isAr ? dispute.jobTitleAr : dispute.jobTitle}</p>
          <p className="text-slate-500 text-xs">{formatDistanceToNow(new Date(dispute.createdAt), { addSuffix: true })}</p>
        </div>
        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${color}`}>
          <Icon className="w-3 h-3" />
          {isAr ? labelAr : label}
        </span>
      </div>
      <p className="text-slate-400 text-xs line-clamp-2">{isAr ? dispute.descriptionAr : dispute.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{isAr ? 'المبلغ المتنازع عليه' : 'Disputed amount'}</span>
        <span className="text-yellow-400 font-medium">{dispute.amount} SAR</span>
      </div>
      {dispute.evidence.length > 0 && (
        <p className="text-slate-500 text-xs">{dispute.evidence.length} {isAr ? 'مرفق' : 'attachments'}</p>
      )}
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useDisputeStore } from '../store/useDisputeStore';
import DisputeCard from '../components/DisputeCard';
import DisputeForm from '../components/DisputeForm';
import DisputeTimeline from '../components/DisputeTimeline';
import EvidenceUploader from '../components/EvidenceUploader';
import { PlusCircle, X, ChevronDown } from 'lucide-react';

export default function DisputesPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { disputes } = useDisputeStore();
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{isAr ? 'النزاعات' : 'Disputes'}</h1>
          <button
            onClick={() => setShowForm(s => !s)}
            className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-3 py-2 text-sm"
          >
            {showForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
            {showForm ? (isAr ? 'إلغاء' : 'Cancel') : (isAr ? 'رفع نزاع' : 'File Dispute')}
          </button>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-2xl border-white/5">
            <DisputeForm onSuccess={() => setShowForm(false)} />
          </motion.div>
        )}

        <div className="space-y-3">
          {disputes.map(d => (
            <div key={d.id} className="space-y-2">
              <div onClick={() => setExpanded(expanded === d.id ? null : d.id)} className="cursor-pointer">
                <DisputeCard dispute={d} />
              </div>
              {expanded === d.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 rounded-2xl border-white/5 space-y-4">
                  <div>
                    <h4 className="text-slate-400 text-xs mb-3">{isAr ? 'المستجدات' : 'Timeline'}</h4>
                    <DisputeTimeline events={d.timeline} />
                  </div>
                  <div>
                    <h4 className="text-slate-400 text-xs mb-2">{isAr ? 'الأدلة' : 'Evidence'}</h4>
                    <EvidenceUploader disputeId={d.id} />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
          {disputes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">{isAr ? 'لا توجد نزاعات' : 'No disputes'}</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

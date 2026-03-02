import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDisputeStore } from '../store/useDisputeStore';
import { DisputeReason } from '../types';

const schema = z.object({
  jobId: z.string().min(1, 'Job ID required'),
  reason: z.enum(['incomplete_work', 'overcharge', 'no_show', 'quality', 'other']),
  description: z.string().min(20, 'Please describe the issue in detail'),
  amount: z.number().min(1, 'Amount required'),
});

type FormData = z.infer<typeof schema>;

const reasons: { value: DisputeReason; label: string; labelAr: string }[] = [
  { value: 'incomplete_work', label: 'Incomplete Work', labelAr: 'عمل غير مكتمل' },
  { value: 'overcharge', label: 'Overcharge', labelAr: 'تحصيل زائد' },
  { value: 'no_show', label: 'No Show', labelAr: 'لم يحضر' },
  { value: 'quality', label: 'Poor Quality', labelAr: 'جودة رديئة' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

interface Props {
  onSuccess?: () => void;
}

export default function DisputeForm({ onSuccess }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { submitDispute, isLoading } = useDisputeStore();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: 'incomplete_work' },
  });

  const onSubmit = async (data: FormData) => {
    await submitDispute(data);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
        <div className="text-5xl mb-3">📋</div>
        <h3 className="text-white text-lg font-bold">{isAr ? 'تم رفع النزاع' : 'Dispute Filed'}</h3>
        <p className="text-slate-400 text-sm mt-2">{isAr ? 'سيتم مراجعة طلبك خلال 48 ساعة' : 'We will review your case within 48 hours'}</p>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
        <h3 className="text-white font-semibold">{isAr ? 'رفع نزاع' : 'File a Dispute'}</h3>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'رقم الوظيفة' : 'Job ID'}</label>
        <input {...register('jobId')} placeholder="j-1234" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50" />
        {errors.jobId && <p className="text-red-400 text-xs mt-1">{errors.jobId.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'سبب النزاع' : 'Reason'}</label>
        <select {...register('reason')} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50">
          {reasons.map(r => <option key={r.value} value={r.value} className="bg-slate-900">{isAr ? r.labelAr : r.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'المبلغ المتنازع عليه (ر.س)' : 'Disputed Amount (SAR)'}</label>
        <input {...register('amount', { valueAsNumber: true })} type="number" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50" />
        {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'وصف المشكلة' : 'Description'}</label>
        <textarea {...register('description')} rows={4} placeholder={isAr ? 'اشرح المشكلة بالتفصيل...' : 'Describe the issue in detail...'} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 resize-none" />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white rounded-xl px-4 py-3 font-medium transition-colors">
        {isLoading ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...') : (isAr ? 'رفع النزاع' : 'File Dispute')}
      </button>
    </motion.form>
  );
}

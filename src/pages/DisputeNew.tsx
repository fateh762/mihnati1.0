import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useDisputeStore } from '@/store/useDisputeStore';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const reasons = [
  { value: 'not_completed', labelAr: 'لم يكتمل العمل', labelEn: 'Work not completed' },
  { value: 'poor_quality', labelAr: 'جودة سيئة', labelEn: 'Poor quality' },
  { value: 'no_show', labelAr: 'عدم الحضور', labelEn: 'No show' },
  { value: 'overcharge', labelAr: 'سعر مرتفع', labelEn: 'Overcharge' },
  { value: 'damage', labelAr: 'ضرر', labelEn: 'Damage caused' },
  { value: 'other', labelAr: 'أخرى', labelEn: 'Other' },
];

const DisputeNew = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const { addDispute } = useDisputeStore();

  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !description.trim()) return;

    addDispute({
      id: `d${Date.now()}`,
      jobId: 'job-unknown',
      jobTitleAr: 'مهمة غير محددة',
      jobTitleEn: 'Unspecified Job',
      clientId: 'c1',
      workerId: 'w1',
      filedBy: 'client',
      reason: reason as any,
      descriptionAr: description,
      descriptionEn: description,
      status: 'open',
      messages: [],
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/disputes');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">
              {isAr ? 'تم تقديم النزاع' : 'Dispute Submitted'}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {isAr
                ? 'سيتم مراجعة نزاعك خلال 24-48 ساعة'
                : 'Your dispute will be reviewed within 24-48 hours'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
            {isAr ? <ArrowRight size={22} /> : <ArrowLeft size={22} />}
          </button>
          <h1 className="text-xl font-black text-white">
            {isAr ? 'رفع نزاع جديد' : 'File a Dispute'}
          </h1>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
          <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200 leading-relaxed">
            {isAr
              ? 'يرجى تقديم تفاصيل دقيقة لمساعدتنا في حل النزاع بسرعة. سيتم مراجعة طلبك خلال 24-48 ساعة.'
              : 'Please provide accurate details to help us resolve the dispute quickly. Your request will be reviewed within 24-48 hours.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason */}
          <div className="space-y-3">
            <Label className="text-sm font-black text-white">
              {isAr ? 'سبب النزاع' : 'Reason for Dispute'}
            </Label>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              {reasons.map((r) => (
                <div
                  key={r.value}
                  className={cn(
                    'flex items-center gap-3 glass border rounded-xl px-4 py-3 cursor-pointer transition-all',
                    reason === r.value ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/5'
                  )}
                  onClick={() => setReason(r.value)}
                >
                  <RadioGroupItem value={r.value} id={r.value} className="text-teal-400 border-teal-400" />
                  <Label htmlFor={r.value} className="text-sm text-white cursor-pointer font-medium">
                    {isAr ? r.labelAr : r.labelEn}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-black text-white">
              {isAr ? 'وصف المشكلة' : 'Problem Description'}
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isAr
                  ? 'اشرح المشكلة بالتفصيل...'
                  : 'Describe the issue in detail...'
              }
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-2xl min-h-[120px] resize-none focus-visible:ring-teal-500/50"
            />
          </div>

          {/* Evidence Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-black text-white">
              {isAr ? 'إرفاق أدلة (اختياري)' : 'Attach Evidence (Optional)'}
            </Label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 text-slate-500 hover:border-teal-500/30 hover:text-teal-400 transition-all"
            >
              <Upload size={24} />
              <span className="text-xs font-medium">
                {isAr ? 'انقر لرفع صور أو ملفات' : 'Click to upload photos or files'}
              </span>
            </button>
          </div>

          <Button
            type="submit"
            disabled={!reason || !description.trim()}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-2xl text-base font-black shadow-lg"
          >
            {isAr ? 'رفع النزاع' : 'Submit Dispute'}
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default DisputeNew;

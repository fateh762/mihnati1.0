import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Calendar, Video, Phone } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useCallStore } from '../store/useCallStore';
import { useState } from 'react';

const schema = z.object({
  participantName: z.string().min(2, 'Name required'),
  type: z.enum(['video', 'voice']),
  scheduledAt: z.string().min(1, 'Date required'),
  topic: z.string().min(3, 'Topic required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onScheduled?: () => void;
}

export default function CallScheduling({ onScheduled }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { scheduleCall } = useCallStore();
  const [scheduled, setScheduled] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'video' },
  });

  const onSubmit = (data: FormData) => {
    scheduleCall({ ...data, participantId: 'p-' + Date.now(), topicAr: data.topic });
    setScheduled(true);
    onScheduled?.();
  };

  if (scheduled) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
        <div className="text-4xl mb-2">📅</div>
        <h3 className="text-white font-bold">{isAr ? 'تم جدولة المكالمة' : 'Call Scheduled!'}</h3>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-teal-400" />
        <h3 className="text-white font-semibold">{isAr ? 'جدولة مكالمة' : 'Schedule a Call'}</h3>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'اسم المشارك' : 'Participant Name'}</label>
        <input {...register('participantName')} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50" />
        {errors.participantName && <p className="text-red-400 text-xs mt-1">{errors.participantName.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-2 block">{isAr ? 'نوع المكالمة' : 'Call Type'}</label>
        <div className="flex gap-3">
          {(['video', 'voice'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input {...register('type')} type="radio" value={t} className="sr-only" />
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                {t === 'video' ? <Video className="w-4 h-4 text-teal-400" /> : <Phone className="w-4 h-4 text-blue-400" />}
                <span className="text-white text-sm">{t === 'video' ? (isAr ? 'فيديو' : 'Video') : (isAr ? 'صوت' : 'Voice')}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'التاريخ والوقت' : 'Date & Time'}</label>
        <input {...register('scheduledAt')} type="datetime-local" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50" />
        {errors.scheduledAt && <p className="text-red-400 text-xs mt-1">{errors.scheduledAt.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'موضوع المكالمة' : 'Topic'}</label>
        <input {...register('topic')} placeholder={isAr ? 'موضوع المناقشة' : 'What to discuss'} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
        {errors.topic && <p className="text-red-400 text-xs mt-1">{errors.topic.message}</p>}
      </div>

      <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-4 py-3 font-medium transition-colors">
        {isAr ? 'جدولة المكالمة' : 'Schedule Call'}
      </button>
    </motion.form>
  );
}

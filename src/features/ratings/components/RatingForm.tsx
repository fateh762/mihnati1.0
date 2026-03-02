import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useRatingStore } from '../store/useRatingStore';
import { useStore } from '@/store/useStore';
import StarRating from './StarRating';

const schema = z.object({
  comment: z.string().min(10, 'Please write at least 10 characters'),
  commentAr: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  workerId: string;
  jobId: string;
  onSuccess?: () => void;
}

export default function RatingForm({ workerId, jobId, onSuccess }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { submitReview, isLoading } = useRatingStore();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (rating === 0) return;
    await submitReview({ authorId: 'current-user', authorName: 'You', workerId, jobId, rating, comment: data.comment, commentAr: data.commentAr ?? data.comment });
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
        <div className="text-4xl mb-2">⭐</div>
        <h3 className="text-white font-bold">{isAr ? 'شكراً على تقييمك!' : 'Thanks for your review!'}</h3>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-3">{isAr ? 'كيف كانت تجربتك؟' : 'How was your experience?'}</p>
        <div className="flex justify-center">
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
        {rating === 0 && <p className="text-red-400 text-xs mt-1">{isAr ? 'يرجى اختيار تقييم' : 'Please select a rating'}</p>}
      </div>
      <div>
        <textarea
          {...register('comment')}
          rows={4}
          placeholder={isAr ? 'اكتب تعليقك هنا...' : 'Write your review here...'}
          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 resize-none"
        />
        {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading || rating === 0}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-xl px-4 py-3 font-medium transition-colors"
      >
        {isLoading ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...') : (isAr ? 'إرسال التقييم' : 'Submit Review')}
      </button>
    </motion.form>
  );
}

import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Review } from '../types';
import { useStore } from '@/store/useStore';
import StarRating from './StarRating';
import VerifiedBadge from './VerifiedBadge';

export default function ReviewCard({ review }: { review: Review }) {
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-2xl border-white/5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
          <span className="text-teal-400 font-bold text-sm">{review.authorName.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white text-sm font-medium">{review.authorName}</p>
            {review.isVerified && <VerifiedBadge />}
          </div>
          <p className="text-slate-500 text-xs">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
        </div>
        <StarRating value={review.rating} readonly size="sm" />
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{isAr ? review.commentAr : review.comment}</p>
    </motion.div>
  );
}

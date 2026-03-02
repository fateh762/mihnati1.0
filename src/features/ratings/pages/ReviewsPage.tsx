import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useRatingStore } from '../store/useRatingStore';
import ReviewCard from '../components/ReviewCard';
import RatingBreakdown from '../components/RatingBreakdown';
import RatingForm from '../components/RatingForm';
import { PlusCircle, X } from 'lucide-react';

export default function ReviewsPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { reviews, breakdown } = useRatingStore();
  const [showForm, setShowForm] = useState(false);

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{isAr ? 'التقييمات والمراجعات' : 'Ratings & Reviews'}</h1>
          <button
            onClick={() => setShowForm(s => !s)}
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-3 py-2 text-sm transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
            {showForm ? (isAr ? 'إلغاء' : 'Cancel') : (isAr ? 'أضف تقييم' : 'Add Review')}
          </button>
        </motion.div>

        <RatingBreakdown breakdown={breakdown} />

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-2xl border-white/5">
            <RatingForm workerId="w1" jobId="j-new" onSuccess={() => setShowForm(false)} />
          </motion.div>
        )}

        <div className="space-y-3">
          {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
        </div>
      </div>
    </MobileLayout>
  );
}

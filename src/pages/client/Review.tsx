import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useReviewStore } from '@/store/useReviewStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const categoryLabels = {
  ar: {
    communication: 'التواصل',
    professionalism: 'الاحترافية',
    quality: 'جودة العمل',
    punctuality: 'الالتزام بالوقت',
  },
  en: {
    communication: 'Communication',
    professionalism: 'Professionalism',
    quality: 'Quality',
    punctuality: 'Punctuality',
  },
};

type CategoryKey = keyof typeof categoryLabels.en;

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { addReview } = useReviewStore();
  const isAr = language === 'ar';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState({
    communication: 0,
    professionalism: 0,
    quality: 0,
    punctuality: 0,
  });

  const setCategoryRating = (key: CategoryKey, value: number) => {
    setCategories((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      id: `r${Date.now()}`,
      jobId: id || 'unknown',
      workerId: 'w1',
      clientId: 'c1',
      clientName: isAr ? 'العميل' : 'Client',
      clientAvatar: 'https://i.pravatar.cc/150?u=client',
      rating,
      categories,
      comment,
      verified: true,
      createdAt: new Date().toISOString(),
    });
    showSuccess(isAr ? 'شكراً لتقييمك!' : 'Thank you for your review!');
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            {isAr ? 'تم إنجاز المهمة!' : 'Job Completed!'}
          </h1>
          <p className="text-slate-500">
            {isAr ? 'كيف كانت تجربتك مع أحمد محمد؟' : 'How was your experience with Ahmed Mohamed?'}
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1 transition-transform active:scale-90"
            >
              <Star
                size={40}
                className={cn(
                  'transition-colors',
                  star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                )}
              />
            </button>
          ))}
        </div>

        {/* Category Ratings */}
        <div className="w-full space-y-4 text-left">
          <p className="text-sm font-semibold text-slate-600 text-center">
            {isAr ? 'تفاصيل التقييم' : 'Detailed Rating'}
          </p>
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <div key={key} className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">
                {isAr ? categoryLabels.ar[key] : categoryLabels.en[key]}
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setCategoryRating(key, star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={22}
                      className={cn(
                        'transition-colors',
                        star <= categories[key] ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full space-y-4">
          <Textarea
            placeholder={isAr ? 'اكتب رأيك هنا (اختياري)...' : 'Write your feedback here (optional)...'}
            className="min-h-[100px] rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-teal-600"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-8 space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-2xl text-lg shadow-lg"
        >
          {isAr ? 'إرسال التقييم' : 'Submit Review'}
        </Button>
        <button
          onClick={() => navigate('/client/dashboard')}
          className="w-full text-slate-400 font-medium text-sm"
        >
          {isAr ? 'تخطي الآن' : 'Skip for now'}
        </button>
      </div>
    </div>
  );
};

export default Review;
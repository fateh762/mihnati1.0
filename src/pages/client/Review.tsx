"use client";

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({
    quality: 0,
    communication: 0,
    punctuality: 0,
    value: 0,
  });

  const categories = [
    { key: 'quality', label: isAr ? 'جودة العمل' : 'Work Quality' },
    { key: 'communication', label: isAr ? 'التواصل' : 'Communication' },
    { key: 'punctuality', label: isAr ? 'الالتزام بالمواعيد' : 'Punctuality' },
    { key: 'value', label: isAr ? 'القيمة مقابل المال' : 'Value for Money' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                  "transition-colors",
                  star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                )} 
              />
            </button>
          ))}
        </div>

        <div className="w-full space-y-4">
          <p className="text-slate-600 font-semibold text-sm text-start">{isAr ? 'تقييم تفصيلي' : 'Detailed Ratings'}</p>
          {categories.map(cat => (
            <div key={cat.key} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{cat.label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCategoryRatings(prev => ({ ...prev, [cat.key]: star }))}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={20}
                      className={cn(
                        'transition-colors',
                        star <= (categoryRatings[cat.key] ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
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
            className="min-h-[120px] rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-teal-600"
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
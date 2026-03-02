import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useReviewStore } from '@/store/useReviewStore';
import { motion } from 'framer-motion';
import { Star, Award, MessageCircle, ChevronRight, ChevronLeft, Shield, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

const WORKER_ID = 'w1';

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

const WorkerReviews = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { reviews, getWorkerRating, getWorkerReviews } = useReviewStore();

  const workerReviews = getWorkerReviews(WORKER_ID);
  const avgRating = getWorkerRating(WORKER_ID);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: workerReviews.filter((r) => r.rating === star).length,
  }));

  const avgCategories = workerReviews.reduce(
    (acc, r) => ({
      communication: acc.communication + r.categories.communication / workerReviews.length,
      professionalism: acc.professionalism + r.categories.professionalism / workerReviews.length,
      quality: acc.quality + r.categories.quality / workerReviews.length,
      punctuality: acc.punctuality + r.categories.punctuality / workerReviews.length,
    }),
    { communication: 0, professionalism: 0, quality: 0, punctuality: 0 }
  );

  const formatTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), {
        addSuffix: true,
        locale: isAr ? ar : undefined,
      });
    } catch {
      return '';
    }
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isAr ? 'تقييماتي' : 'My Reviews'}
          </h1>
          {avgRating >= 4.5 && (
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1.5 px-3 py-1.5">
              <Award size={14} />
              {isAr ? 'مميز' : 'Top Rated'}
            </Badge>
          )}
        </div>

        {/* Rating Overview Card */}
        <Card className="p-6 bg-gradient-to-br from-teal-600 to-teal-800 border-none rounded-3xl text-white shadow-xl">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-black">{avgRating.toFixed(1)}</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className={cn(s <= Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-white/30')}
                  />
                ))}
              </div>
              <p className="text-teal-100 text-xs mt-1">
                {workerReviews.length} {isAr ? 'تقييم' : 'reviews'}
              </p>
            </div>
            <div className="flex-1 space-y-1.5">
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-teal-100 w-3">{star}</span>
                  <Star size={10} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{
                        width: workerReviews.length
                          ? `${(count / workerReviews.length) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <span className="text-xs text-teal-100 w-3">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={16} className="text-teal-400" />
            {isAr ? 'تفاصيل التقييم' : 'Rating Breakdown'}
          </h3>
          {(Object.keys(avgCategories) as Array<keyof typeof avgCategories>).map((key) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>{isAr ? categoryLabels.ar[key] : categoryLabels.en[key]}</span>
                <span className="text-teal-400 font-bold">{avgCategories[key].toFixed(1)}</span>
              </div>
              <Progress
                value={(avgCategories[key] / 5) * 100}
                className="h-1.5 bg-white/10"
              />
            </div>
          ))}
        </Card>

        {/* Reviews List */}
        <section className="space-y-4">
          <h3 className="font-black text-white flex items-center gap-2">
            <MessageCircle size={18} className="text-teal-400" />
            {isAr ? 'آراء العملاء' : 'Client Reviews'}
          </h3>
          {workerReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.clientAvatar}
                    alt={review.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{review.clientName}</p>
                    <p className="text-[10px] text-slate-500">{formatTime(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={cn(
                        s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                      )}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-slate-300 leading-relaxed">{review.comment}</p>
              )}
              {review.verified && (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <Shield size={11} />
                  {isAr ? 'تقييم موثق' : 'Verified review'}
                </div>
              )}
            </motion.div>
          ))}
        </section>
      </div>
    </MobileLayout>
  );
};

export default WorkerReviews;

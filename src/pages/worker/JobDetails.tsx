import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Clock, Star, ShieldCheck, MessageCircle, Phone } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { jobs, updateJobStatus } = useJobStore();
  const [bidAmount, setBidAmount] = useState('');
  const isAr = language === 'ar';

  const job = jobs.find(j => j.id === id);

  if (!job) return <div className="p-8 text-center">{isAr ? 'المهمة غير موجودة' : 'Job not found'}</div>;

  const handleAccept = () => {
    updateJobStatus(job.id, 'in_progress');
    showSuccess(isAr ? 'تم قبول المهمة بنجاح' : 'Job accepted successfully');
    navigate('/worker/jobs');
  };

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isAr ? 'تم تقديم عرضك بنجاح' : 'Bid submitted successfully');
    navigate('/worker/explore');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-lg font-bold text-slate-800">{isAr ? 'تفاصيل المهمة' : 'Job Details'}</h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <section className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Badge className="bg-teal-50 text-teal-700 border-none">{job.category}</Badge>
              <h2 className="text-2xl font-bold text-slate-800">{job.title}</h2>
            </div>
            <div className="text-right">
              <div className="text-teal-600 font-bold text-xl">
                {job.priceType === 'fixed' ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}
              </div>
              <p className="text-xs text-slate-400">{isAr ? 'السعر المتوقع' : 'Expected Price'}</p>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-teal-600" />
              {job.distance}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-teal-600" />
              {isAr ? 'منذ ساعة' : '1h ago'}
            </div>
          </div>
        </section>

        <Card className="p-4 border-none shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">{isAr ? 'الوصف' : 'Description'}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
          <div className="grid grid-cols-2 gap-2">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" className="rounded-xl aspect-square object-cover" alt="job" />
            <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400" className="rounded-xl aspect-square object-cover" alt="job" />
          </div>
        </Card>

        <Card className="p-4 border-none shadow-sm flex items-center gap-4">
          <img src="https://i.pravatar.cc/150?u=client" className="w-12 h-12 rounded-full" alt="client" />
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">سارة الأحمد</h3>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <Star size={12} fill="currentColor" /> 4.8 (42 {isAr ? 'تقييم' : 'reviews'})
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-50 text-slate-600 rounded-full"><MessageCircle size={20} /></button>
            <button className="p-2 bg-slate-50 text-slate-600 rounded-full"><Phone size={20} /></button>
          </div>
        </Card>

        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-start gap-3">
          <ShieldCheck className="text-teal-600 shrink-0" />
          <p className="text-xs text-teal-800 leading-relaxed">
            {isAr 
              ? 'أموالك محمية في نظام الضمان الخاص بنا. سيتم تحويل المبلغ لك فور تأكيد العميل لإنجاز المهمة.' 
              : 'Your funds are protected in our escrow system. Payment will be released once the client confirms completion.'}
          </p>
        </div>
      </div>

      <footer className="p-6 bg-white border-t border-slate-100">
        {job.priceType === 'fixed' ? (
          <Button onClick={handleAccept} className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-lg">
            {isAr ? 'قبول المهمة' : 'Accept Job'}
          </Button>
        ) : (
          <form onSubmit={handleBid} className="space-y-4">
            <div className="space-y-2">
              <Label>{isAr ? 'عرضك (ريال)' : 'Your Bid (SAR)'}</Label>
              <Input 
                type="number" 
                className="h-12 rounded-xl text-lg font-bold" 
                placeholder="0.00"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full h-14 bg-orange-500 hover:bg-orange-600 rounded-xl text-lg shadow-lg">
              {isAr ? 'تقديم العرض' : 'Submit Bid'}
            </Button>
          </form>
        )}
      </footer>
    </div>
  );
};

export default JobDetails;
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
import { ChevronRight, ChevronLeft, MapPin, Clock, Star, ShieldCheck, MessageCircle, Phone, Zap } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { jobs, updateJobStatus } = useJobStore();
  const [bidAmount, setBidAmount] = useState('');
  const isAr = language === 'ar';

  const job = jobs.find(j => j.id === id);

  if (!job) return <div className="p-8 text-center text-slate-500 font-black uppercase tracking-widest">{isAr ? 'المهمة غير موجودة' : 'Data Not Found'}</div>;

  const handleAccept = () => {
    updateJobStatus(job.id, 'in_progress');
    showSuccess(isAr ? 'تم قبول المهمة بنجاح' : 'Task accepted successfully');
    navigate('/worker/jobs');
  };

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isAr ? 'تم تقديم عرضك بنجاح' : 'Bid submitted successfully');
    navigate('/worker/explore');
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <header className="p-6 glass border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-white transition-colors">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-lg font-black text-white tracking-tight uppercase">{isAr ? 'تفاصيل المهمة' : 'Task Analysis'}</h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto relative z-10">
        <section className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-black uppercase tracking-widest">{job.category}</Badge>
              <h2 className="text-2xl font-black text-white tracking-tight">{job.title}</h2>
            </div>
            <div className="text-right">
              <div className="text-teal-400 font-black text-2xl">
                {job.priceType === 'fixed' ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{isAr ? 'السعر المتوقع' : 'Est. Credits'}</p>
            </div>
          </div>

          <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-teal-500" />
              {job.distance}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-teal-500" />
              {isAr ? 'منذ ساعة' : '1h ago'}
            </div>
          </div>
        </section>

        <Card className="p-6 glass border-white/5 rounded-[2.5rem] space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{isAr ? 'الوصف' : 'Data Stream'}</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">{job.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative group overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" className="aspect-square object-cover group-hover:scale-110 transition-transform duration-700" alt="job" />
              <div className="absolute inset-0 bg-teal-500/10" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400" className="aspect-square object-cover group-hover:scale-110 transition-transform duration-700" alt="job" />
              <div className="absolute inset-0 bg-teal-500/10" />
            </div>
          </div>
        </Card>

        <Card className="p-5 glass border-white/5 rounded-[2.5rem] flex items-center gap-4 group">
          <div className="relative">
            <img src="https://i.pravatar.cc/150?u=client" className="w-14 h-14 rounded-2xl object-cover border border-white/10" alt="client" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-lg flex items-center justify-center border-2 border-[#02040a]">
              <Zap size={10} className="text-white fill-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">سارة الأحمد</h3>
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-black uppercase tracking-widest mt-1">
              <Star size={12} fill="currentColor" /> 4.8 <span className="text-slate-500">(42 {isAr ? 'تقييم' : 'reviews'})</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors"><MessageCircle size={20} /></button>
            <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors"><Phone size={20} /></button>
          </div>
        </Card>

        <div className="p-5 glass rounded-[2rem] border border-teal-500/20 flex items-start gap-4">
          <ShieldCheck className="text-teal-400 shrink-0" size={24} />
          <p className="text-[10px] font-bold text-teal-400/80 uppercase tracking-widest leading-relaxed">
            {isAr 
              ? 'أموالك محمية في نظام الضمان الخاص بنا. سيتم تحويل المبلغ لك فور تأكيد العميل لإنجاز المهمة.' 
              : 'Credits are secured in our neural escrow. Release occurs upon client confirmation of task completion.'}
          </p>
        </div>
      </div>

      <footer className="p-6 glass border-t border-white/5 sticky bottom-0 z-20">
        {job.priceType === 'fixed' ? (
          <Button onClick={handleAccept} className="w-full h-16 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_0_30px_rgba(20,184,166,0.3)] border-t border-white/20">
            {isAr ? 'قبول المهمة' : 'Accept Protocol'}
          </Button>
        ) : (
          <form onSubmit={handleBid} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{isAr ? 'عرضك (ريال)' : 'Your Bid (SAR)'}</Label>
              <Input 
                type="number" 
                className="h-14 rounded-2xl bg-white/5 border-white/5 text-white text-xl font-black text-center focus:ring-teal-500/50" 
                placeholder="0.00"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full h-16 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_0_30px_rgba(249,115,22,0.3)] border-t border-white/20">
              {isAr ? 'تقديم العرض' : 'Submit Proposal'}
            </Button>
          </form>
        )}
      </footer>
    </div>
  );
};

export default JobDetails;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Star, MapPin, MessageCircle, CheckCircle2, Zap } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const JobBids = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { jobs, updateJobStatus } = useJobStore();
  const isAr = language === 'ar';

  const job = jobs.find(j => j.id === id);

  const mockBids = [
    { id: 1, name: 'أحمد محمد', rating: 4.9, reviews: 124, price: '140 SAR', distance: '2.5 km', image: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'خالد العتيبي', rating: 4.7, reviews: 89, price: '130 SAR', distance: '4.1 km', image: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'ياسر القحطاني', rating: 4.8, reviews: 56, price: '150 SAR', distance: '1.2 km', image: 'https://i.pravatar.cc/150?u=3' },
  ];

  if (!job) return null;

  const handleAcceptBid = (bidName: string) => {
    updateJobStatus(job.id, 'in_progress');
    showSuccess(isAr ? `تم قبول عرض ${bidName} بنجاح` : `Accepted ${bidName}'s bid successfully`);
    navigate('/client/jobs');
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <header className="p-6 glass border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-white transition-colors">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-lg font-black text-white tracking-tight uppercase">{isAr ? 'العروض المستلمة' : 'Neural Proposals'}</h1>
        <div className="w-10" />
      </header>

      <div className="p-6 space-y-8 overflow-y-auto flex-1 relative z-10">
        <div className="space-y-3">
          <Badge className="bg-orange-500/10 text-orange-400 border-none text-[9px] font-black uppercase tracking-widest">{job.category}</Badge>
          <h2 className="text-2xl font-black text-white tracking-tight">{job.title}</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{mockBids.length} {isAr ? 'عروض متوفرة' : 'active proposals'}</p>
        </div>

        <div className="space-y-4">
          {mockBids.map((bid) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 glass border-white/5 rounded-[2.5rem] space-y-6 group hover:border-teal-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={bid.image} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt={bid.name} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center border-2 border-[#02040a]">
                      <Zap size={12} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{bid.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-widest">
                        <Star size={12} fill="currentColor" /> {bid.rating}
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{bid.reviews} {isAr ? 'تقييم' : 'reviews'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-400 font-black text-xl">{bid.price}</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 justify-end">
                      <MapPin size={10} className="text-teal-500" /> {bid.distance}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl border-white/5 glass text-slate-400 hover:text-teal-400 font-black text-[10px] uppercase tracking-widest gap-2"
                  >
                    <MessageCircle size={18} />
                    {isAr ? 'دردشة' : 'Sync'}
                  </Button>
                  <Button 
                    onClick={() => handleAcceptBid(bid.name)}
                    className="flex-1 h-12 bg-teal-500 hover:bg-teal-400 text-white rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                  >
                    <CheckCircle2 size={18} />
                    {isAr ? 'قبول العرض' : 'Authorize'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobBids;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Star, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-lg font-bold text-slate-800">{isAr ? 'العروض المستلمة' : 'Received Bids'}</h1>
        <div className="w-10" />
      </header>

      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        <div className="space-y-2">
          <Badge className="bg-orange-50 text-orange-700 border-none">{job.category}</Badge>
          <h2 className="text-xl font-bold text-slate-800">{job.title}</h2>
          <p className="text-sm text-slate-500">{mockBids.length} {isAr ? 'عروض متوفرة' : 'bids available'}</p>
        </div>

        <div className="space-y-4">
          {mockBids.map((bid) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-5 border-none shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <img src={bid.image} className="w-14 h-14 rounded-2xl object-cover" alt={bid.name} />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{bid.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star size={12} fill="currentColor" /> {bid.rating}
                      </div>
                      <span className="text-[10px] text-slate-400">{bid.reviews} {isAr ? 'تقييم' : 'reviews'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-600 font-bold text-lg">{bid.price}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <MapPin size={10} /> {bid.distance}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11 rounded-xl border-slate-200 text-slate-600 gap-2"
                  >
                    <MessageCircle size={18} />
                    {isAr ? 'دردشة' : 'Chat'}
                  </Button>
                  <Button 
                    onClick={() => handleAcceptBid(bid.name)}
                    className="flex-1 h-11 bg-teal-600 hover:bg-teal-700 rounded-xl gap-2"
                  >
                    <CheckCircle2 size={18} />
                    {isAr ? 'قبول العرض' : 'Accept'}
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
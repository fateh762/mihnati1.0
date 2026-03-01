import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Clock, Star, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Explore = () => {
  const { language } = useStore();
  const { jobs } = useJobStore();
  const [view, setView] = useState<'list' | 'map'>('list');
  const isAr = language === 'ar';

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <header className="p-6 space-y-6 sticky top-0 z-20 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-white tracking-tight">{isAr ? 'استكشاف الشبكة' : 'Network Explore'}</h1>
            <div className="flex glass p-1 rounded-xl border-white/5">
              <button 
                onClick={() => setView('list')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", 
                  view === 'list' ? "bg-teal-500 text-white shadow-lg" : "text-slate-500"
                )}
              >
                {isAr ? 'قائمة' : 'List'}
              </button>
              <button 
                onClick={() => setView('map')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", 
                  view === 'map' ? "bg-teal-500 text-white shadow-lg" : "text-slate-500"
                )}
              >
                {isAr ? 'خريطة' : 'Map'}
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-teal-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <Input 
                  className="pl-12 h-12 rounded-xl border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-teal-500/50" 
                  placeholder={isAr ? 'بحث عن مهام...' : 'Scan for tasks...'} 
                />
              </div>
            </div>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-white/5 glass text-slate-400 hover:text-teal-400">
              <Filter size={18} />
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-4">
          {view === 'list' ? (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-[2.5rem] border-white/5 hover:border-teal-500/30 transition-all space-y-5 group"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-black uppercase tracking-widest">
                        {job.category}
                      </Badge>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={10} className="text-teal-500" /> {isAr ? 'منذ 5 دقائق' : '5m ago'}
                      </span>
                    </div>
                    <h3 className="font-black text-white text-lg tracking-tight group-hover:text-teal-400 transition-colors">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-400 font-black text-xl">
                      {job.priceType === 'fixed' ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{job.bidsCount} {isAr ? 'عروض' : 'bids'}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      <MapPin size={14} className="text-teal-500" />
                      {job.distance}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      4.8
                    </div>
                  </div>
                  <Link to={`/worker/job/${job.id}`} className="flex items-center gap-2 text-teal-400 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    {isAr ? 'عرض التفاصيل' : 'View Details'}
                    {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-[500px] glass rounded-[3rem] border-white/5 flex items-center justify-center text-slate-400 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=60" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                alt="map placeholder"
              />
              <div className="relative z-10 glass p-8 rounded-[2.5rem] border-white/10 text-center shadow-2xl">
                <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-teal-400" size={32} />
                </div>
                <p className="font-black text-white uppercase tracking-tight mb-1">{isAr ? 'عرض الخريطة التفاعلي' : 'Neural Map View'}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{isAr ? 'قريباً في التحديث القادم' : 'Syncing in next update'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Explore;
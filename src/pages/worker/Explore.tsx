import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Clock, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Explore = () => {
  const { language } = useStore();
  const { jobs } = useJobStore();
  const [view, setView] = useState<'list' | 'map'>('list');
  const isAr = language === 'ar';

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <header className="p-6 bg-white space-y-4 sticky top-0 z-10 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">{isAr ? 'استكشاف المهام' : 'Explore Jobs'}</h1>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setView('list')}
                className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all", view === 'list' ? "bg-white shadow-sm text-teal-600" : "text-slate-500")}
              >
                {isAr ? 'قائمة' : 'List'}
              </button>
              <button 
                onClick={() => setView('map')}
                className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all", view === 'map' ? "bg-white shadow-sm text-teal-600" : "text-slate-500")}
              >
                {isAr ? 'خريطة' : 'Map'}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50" placeholder={isAr ? 'بحث عن مهام...' : 'Search jobs...'} />
            </div>
            <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-slate-200">
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
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-none text-[10px] uppercase tracking-wider">
                        {job.category}
                      </Badge>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {isAr ? 'منذ 5 دقائق' : '5m ago'}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-600 font-bold text-lg">
                      {job.priceType === 'fixed' ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}
                    </div>
                    <p className="text-[10px] text-slate-400">{job.bidsCount} {isAr ? 'عروض' : 'bids'}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={14} className="text-teal-600" />
                      {job.distance}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      4.8
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-teal-600 font-bold text-sm">
                    {isAr ? 'عرض التفاصيل' : 'View Details'}
                    {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-[500px] bg-slate-200 rounded-3xl flex items-center justify-center text-slate-400 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=60" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                alt="map placeholder"
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl text-center">
                <MapPin className="mx-auto mb-2 text-teal-600" size={32} />
                <p className="font-bold text-slate-800">{isAr ? 'عرض الخريطة التفاعلي' : 'Interactive Map View'}</p>
                <p className="text-xs text-slate-500">{isAr ? 'قريباً في التحديث القادم' : 'Coming soon in next update'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Explore;
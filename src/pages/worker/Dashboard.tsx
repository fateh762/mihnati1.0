import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Star, TrendingUp, CheckCircle, Clock, MapPin, Zap, Bell, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WorkerDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const stats = [
    { label: isAr ? 'الأرباح' : 'Credits', value: '2,450', icon: TrendingUp, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { label: isAr ? 'التقييم' : 'Rating', value: '4.9', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: isAr ? 'المهام' : 'Tasks', value: '124', icon: CheckCircle, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

  const recentJobs = [
    { id: 1, title: isAr ? 'إصلاح تسرب مياه' : 'Hydro-System Repair', price: '150 SAR', distance: '2.5 km', time: '10m ago', status: 'New' },
    { id: 2, title: isAr ? 'تركيب مكيف سبليت' : 'Thermal Unit Install', price: '300 SAR', distance: '5.1 km', time: '25m ago', status: 'Bidding' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              {isAr ? 'متصل بالشبكة' : 'System Online'}
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {isAr ? 'أهلاً، أحمد' : 'Hello, Ahmed'}
            </h1>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-teal-500 rounded-xl blur opacity-20" />
            <div className="w-14 h-14 rounded-xl glass p-0.5 border-teal-500/30 relative">
              <img src="https://i.pravatar.cc/150?u=worker" alt="avatar" className="w-full h-full rounded-[10px] object-cover" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} className="glass p-4 border-white/5 flex flex-col items-center text-center gap-2 rounded-2xl">
              <div className={cn("p-2.5 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={18} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                <p className="font-black text-white text-sm">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'مهام متاحة' : 'Available Tasks'}
            </h2>
            <button className="text-teal-400 text-[10px] font-bold uppercase tracking-widest hover:underline">
              {isAr ? 'الكل' : 'View All'}
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ x: 5 }}
                className="glass p-5 rounded-[2rem] border-white/5 hover:border-teal-500/30 transition-all flex justify-between items-center group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{job.title}</h3>
                    <Badge className="bg-teal-500/10 text-teal-400 border-none text-[9px] font-black uppercase tracking-widest">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-teal-500" /> {job.distance}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-teal-500" /> {job.time}</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-teal-400 font-black text-lg">{job.price}</div>
                  <button className="bg-white/5 hover:bg-teal-500 text-white p-2 rounded-xl transition-all duration-300">
                    {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-800 text-white border-none rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-amber-400 fill-amber-400" />
              <h3 className="text-sm font-black uppercase tracking-widest">{isAr ? 'نصيحة النظام' : 'System Insight'}</h3>
            </div>
            <p className="text-white/80 text-xs font-medium leading-relaxed">
              {isAr 
                ? 'الاستجابة السريعة تزيد من معدل قبولك بنسبة 40%.' 
                : 'Rapid response protocols increase acceptance rates by 40%.'}
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <TrendingUp size={120} />
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default WorkerDashboard;
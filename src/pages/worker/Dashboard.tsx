import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Wallet, Star, Briefcase, TrendingUp, Bell, Search, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const WorkerDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const stats = [
    { label: isAr ? 'الأرباح' : 'Earnings', value: '1,250 SAR', icon: Wallet, color: 'text-emerald-400', path: '/worker/earnings' },
    { label: isAr ? 'التقييم' : 'Rating', value: '4.8', icon: Star, color: 'text-amber-400', path: '/reviews' },
    { label: isAr ? 'المهام' : 'Jobs', value: '12', icon: Briefcase, color: 'text-blue-400', path: '/worker/jobs' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isAr ? 'أهلاً أحمد' : 'Hello, Ahmed'}
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              {isAr ? 'أنت متصل الآن' : 'System Online'}
            </p>
          </div>
          <Link to="/notifications" className="relative p-2 glass rounded-xl border-white/5">
            <Bell size={20} className="text-slate-400" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          </Link>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.path)}
              className="glass p-4 rounded-[2rem] border-white/5 flex flex-col items-center gap-2 hover:border-teal-500/30 transition-all"
            >
              <stat.icon size={20} className={stat.color} />
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-xs font-black text-white">{stat.value}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'إجراءات سريعة' : 'Quick Protocols'}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate('/worker/explore')}
              className="h-24 glass border-white/5 rounded-[2.5rem] flex flex-col gap-2 hover:bg-teal-500/10 group"
            >
              <Search className="text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'ابحث عن عمل' : 'Find Tasks'}</span>
            </Button>
            <Button 
              onClick={() => navigate('/analytics')}
              className="h-24 glass border-white/5 rounded-[2.5rem] flex flex-col gap-2 hover:bg-indigo-500/10 group"
            >
              <TrendingUp className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'التحليلات' : 'Analytics'}</span>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'المهام النشطة' : 'Active Streams'}
            </h2>
            <Link to="/worker/jobs" className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
              {isAr ? 'الكل' : 'View All'}
            </Link>
          </div>
          
          <Card className="glass border-white/5 rounded-[2.5rem] p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2 py-1 rounded-lg">Plumbing</span>
                <h3 className="text-white font-bold mt-2">إصلاح تسرب مياه</h3>
              </div>
              <div className="text-right">
                <p className="text-white font-black">150 SAR</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Fixed Price</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10" />
                <span className="text-[10px] font-bold text-slate-400">سارة الأحمد</span>
              </div>
              <Button 
                onClick={() => navigate('/worker/job/1/navigation')}
                size="sm" 
                className="bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-[9px] font-black uppercase tracking-widest h-8"
              >
                {isAr ? 'توجه للموقع' : 'Navigate'}
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </MobileLayout>
  );
};

export default WorkerDashboard;
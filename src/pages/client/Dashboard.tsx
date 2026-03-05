import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { PlusCircle, Briefcase, Wallet, Bell, Search, ChevronRight, Zap, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ClientDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const stats = [
    { label: isAr ? 'طلبات نشطة' : 'Active Jobs', value: '3', icon: Briefcase, color: 'text-teal-400' },
    { label: isAr ? 'الميزانية' : 'Budget', value: '5,000', icon: Wallet, color: 'text-emerald-400' },
    { label: isAr ? 'فنيين' : 'Experts', value: '12', icon: Zap, color: 'text-amber-400' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isAr ? 'أهلاً سارة' : 'Hello, Sara'}
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              {isAr ? 'رصيدك جاهز' : 'Credits Ready'}
            </p>
          </div>
          <Link to="/notifications" className="relative p-2 glass rounded-xl border-white/5">
            <Bell size={20} className="text-slate-400" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          </Link>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-[2rem] border-white/5 flex flex-col items-center gap-2"
            >
              <stat.icon size={20} className={stat.color} />
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-xs font-black text-white">{stat.value}</p>
              </div>
            </motion.div>
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
              onClick={() => navigate('/client/post-job')}
              className="h-24 glass border-white/5 rounded-[2.5rem] flex flex-col gap-2 hover:bg-teal-500/10 group"
            >
              <PlusCircle className="text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'نشر طلب' : 'Post Task'}</span>
            </Button>
            <Button 
              onClick={() => navigate('/client/explore')}
              className="h-24 glass border-white/5 rounded-[2.5rem] flex flex-col gap-2 hover:bg-indigo-500/10 group"
            >
              <Search className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'بحث عن فني' : 'Find Expert'}</span>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'آخر العروض' : 'Recent Bids'}
            </h2>
            <Link to="/client/jobs" className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
              {isAr ? 'الكل' : 'View All'}
            </Link>
          </div>
          
          <Card className="glass border-white/5 rounded-[2.5rem] p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=worker" alt="worker" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">أحمد محمد</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] text-slate-400 font-bold">4.9 (124 reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-400 font-black">140 SAR</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Bid Amount</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/client/job/1/bids')}
              className="w-full bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest h-10 border border-white/5"
            >
              {isAr ? 'عرض التفاصيل' : 'View Proposal'}
            </Button>
          </Card>
        </section>
      </div>
    </MobileLayout>
  );
};

export default ClientDashboard;
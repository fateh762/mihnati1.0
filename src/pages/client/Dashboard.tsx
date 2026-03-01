import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ChevronLeft, ChevronRight, Bell, Cpu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ClientDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const categories = [
    { id: 'driver', label: isAr ? 'سائق' : 'Driver', icon: '🚗', color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 'makeup', label: isAr ? 'تجميل' : 'Beauty', icon: '💄', color: 'from-pink-500/20 to-rose-500/20' },
    { id: 'plumbing', label: isAr ? 'سباكة' : 'Plumbing', icon: '🚰', color: 'from-emerald-500/20 to-teal-500/20' },
    { id: 'electrical', label: isAr ? 'كهرباء' : 'Electric', icon: '⚡', color: 'from-yellow-500/20 to-orange-500/20' },
    { id: 'it_support', label: isAr ? 'تقني' : 'Tech', icon: '💻', color: 'from-indigo-500/20 to-violet-500/20' },
    { id: 'ac', label: isAr ? 'تكييف' : 'AC', icon: '❄️', color: 'from-sky-500/20 to-blue-500/20' },
  ];

  const featuredWorkers = [
    { id: 1, name: 'نورة العلي', rating: 4.9, jobs: 124, category: isAr ? 'خبيرة تجميل' : 'Makeup Artist', image: 'https://i.pravatar.cc/150?u=female1' },
    { id: 2, name: 'محمد العتيبي', rating: 4.9, jobs: 150, category: isAr ? 'سباك' : 'Plumber', image: 'https://i.pravatar.cc/150?u=1' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border-white/5">
              <MapPin size={14} className="text-teal-400" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                {isAr ? 'الرياض، حي الملقا' : 'Riyadh, Al Malqa'}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <div className="w-10 h-10 rounded-xl glass p-0.5 border-teal-500/30">
                <img src="https://i.pravatar.cc/150?u=client" alt="avatar" className="w-full h-full rounded-[10px] object-cover" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight">
              {isAr ? 'مرحباً، سارة' : 'Hello, Sara'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {isAr ? 'ما هي الخدمة التي تطلبينها اليوم؟' : 'What service do you require today?'}
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <Input 
                className="pl-12 h-14 rounded-2xl border-white/5 bg-white/5 backdrop-blur-xl text-white placeholder:text-slate-600 focus:ring-teal-500/50" 
                placeholder={isAr ? 'ابحث عن خدمة أو فني...' : 'Search for service or expert...'}
              />
            </div>
          </div>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'التصنيفات الذكية' : 'Smart Categories'}
            </h2>
            <button className="text-teal-400 text-[10px] font-bold uppercase tracking-widest hover:underline">
              {isAr ? 'الكل' : 'View All'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/client/post-job"
                className="group"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "aspect-square rounded-3xl glass flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:border-teal-500/50 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]",
                    "bg-gradient-to-br", cat.color
                  )}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">{cat.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              {isAr ? 'أفضل الخبراء' : 'Top Rated Experts'}
            </h2>
          </div>
          <div className="space-y-4">
            {featuredWorkers.map((worker) => (
              <motion.div 
                key={worker.id}
                whileHover={{ x: 5 }}
                className="glass p-4 rounded-[2rem] flex items-center gap-4 border-white/5 hover:border-teal-500/30 transition-all group"
              >
                <div className="relative">
                  <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center border-2 border-[#02040a] shadow-lg">
                    <Star size={10} className="text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{worker.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">{worker.category}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-teal-400 text-[10px] font-black">
                      {worker.rating}
                    </div>
                    <div className="w-1 h-1 bg-slate-700 rounded-full" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      {worker.jobs} {isAr ? 'مهمة' : 'Jobs'}
                    </span>
                  </div>
                </div>
                <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                  {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <Card className="p-6 bg-gradient-to-br from-teal-600 to-indigo-700 text-white border-none rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="relative z-10 flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase tracking-tighter">{isAr ? 'خصم حصري' : 'Exclusive Offer'}</h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                {isAr ? 'استخدم كود: NEON20' : 'Use Code: NEON20'}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Cpu size={24} className="animate-pulse" />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ClientDashboard;
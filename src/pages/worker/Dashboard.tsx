import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Star, TrendingUp, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WorkerDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const stats = [
    { label: isAr ? 'الأرباح' : 'Earnings', value: '2,450 SAR', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: isAr ? 'التقييم' : 'Rating', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: isAr ? 'المهام' : 'Jobs', value: '124', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const recentJobs = [
    { id: 1, title: isAr ? 'إصلاح تسرب مياه' : 'Water Leak Repair', price: '150 SAR', distance: '2.5 km', time: '10m ago', status: 'New' },
    { id: 2, title: isAr ? 'تركيب مكيف سبليت' : 'AC Installation', price: '300 SAR', distance: '5.1 km', time: '25m ago', status: 'Bidding' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {isAr ? 'أهلاً، أحمد' : 'Hello, Ahmed'}
            </h1>
            <p className="text-slate-500 text-sm">
              {isAr ? 'أنت متصل الآن ومستعد للعمل' : 'You are online and ready to work'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-100 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=worker" alt="avatar" />
          </div>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} className="p-3 border-none shadow-sm flex flex-col items-center text-center gap-1">
              <div className={cn("p-2 rounded-xl mb-1", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs text-slate-500">{stat.label}</span>
              <span className="font-bold text-slate-800 text-sm">{stat.value}</span>
            </Card>
          ))}
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              {isAr ? 'طلبات قريبة منك' : 'Jobs Near You'}
            </h2>
            <button className="text-teal-600 text-sm font-medium">
              {isAr ? 'عرض الكل' : 'View All'}
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800">{job.title}</h3>
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-none text-[10px]">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.distance}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-teal-600 font-bold">{job.price}</div>
                  <button className="mt-2 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-medium">
                    {isAr ? 'عرض التفاصيل' : 'Details'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Card className="p-6 bg-gradient-to-br from-teal-600 to-teal-700 text-white border-none rounded-3xl shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">{isAr ? 'نصيحة اليوم' : 'Tip of the Day'}</h3>
            <p className="text-teal-50 text-sm leading-relaxed opacity-90">
              {isAr 
                ? 'الرد السريع على طلبات العملاء يزيد من فرص قبولك بنسبة 40%.' 
                : 'Responding quickly to client requests increases your acceptance rate by 40%.'}
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <TrendingUp size={120} />
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default WorkerDashboard;
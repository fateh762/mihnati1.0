import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ClientDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const categories = [
    { id: 'plumbing', label: isAr ? 'سباكة' : 'Plumbing', icon: '🚰' },
    { id: 'electrical', label: isAr ? 'كهرباء' : 'Electrical', icon: '⚡' },
    { id: 'cleaning', label: isAr ? 'تنظيف' : 'Cleaning', icon: '🧹' },
    { id: 'ac', label: isAr ? 'تكييف' : 'AC Repair', icon: '❄️' },
    { id: 'moving', label: isAr ? 'نقل عفش' : 'Moving', icon: '📦' },
    { id: 'painting', label: isAr ? 'دهانات' : 'Painting', icon: '🎨' },
  ];

  const featuredWorkers = [
    { id: 1, name: 'محمد العتيبي', rating: 4.9, jobs: 150, category: isAr ? 'سباك' : 'Plumber', image: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'خالد الشمري', rating: 4.8, jobs: 89, category: isAr ? 'كهربائي' : 'Electrician', image: 'https://i.pravatar.cc/150?u=2' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} className="text-teal-600" />
              <span>{isAr ? 'الرياض، حي الملقا' : 'Riyadh, Al Malqa'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=client" alt="avatar" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isAr ? 'ما الذي تحتاجه اليوم؟' : 'What do you need today?'}
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm text-lg" 
              placeholder={isAr ? 'ابحث عن خدمة أو فني...' : 'Search for service or expert...'}
            />
          </div>
        </header>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">{isAr ? 'التصنيفات' : 'Categories'}</h2>
            <button className="text-teal-600 text-sm font-medium">{isAr ? 'الكل' : 'All'}</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-slate-600">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">{isAr ? 'فنيين متميزين' : 'Featured Experts'}</h2>
          </div>
          <div className="space-y-4">
            {featuredWorkers.map((worker) => (
              <Card key={worker.id} className="p-4 border-none shadow-sm flex items-center gap-4">
                <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{worker.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{worker.category}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star size={12} fill="currentColor" /> {worker.rating}
                    </div>
                    <span className="text-[10px] text-slate-400">{worker.jobs} {isAr ? 'مهمة منجزة' : 'jobs completed'}</span>
                  </div>
                </div>
                <button className="p-2 bg-slate-50 rounded-full text-slate-400">
                  {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </Card>
            ))}
          </div>
        </section>

        <Card className="p-6 bg-orange-500 text-white border-none rounded-3xl shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-1">{isAr ? 'خصم 20٪' : '20% Discount'}</h3>
            <p className="text-orange-50 text-sm opacity-90">
              {isAr ? 'على أول طلب لك باستخدام كود: MIHNATI20' : 'On your first job using code: MIHNATI20'}
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ClientDashboard;
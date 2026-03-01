import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const categories = [
    { id: 'driver', label: isAr ? 'سائق خاص' : 'Private Driver', icon: '🚗' },
    { id: 'makeup', label: isAr ? 'خبيرة تجميل' : 'Makeup Artist', icon: '💄' },
    { id: 'hair_stylist', label: isAr ? 'مصففة شعر' : 'Hair Stylist', icon: '💇‍♀️' },
    { id: 'henna', label: isAr ? 'نقش حناء' : 'Henna Artist', icon: '🎨' },
    { id: 'tailoring', label: isAr ? 'خياطة وتفصيل' : 'Tailoring', icon: '🧵' },
    { id: 'home_salon', label: isAr ? 'صالون منزلي' : 'Home Salon', icon: '💅' },
    { id: 'plumbing', label: isAr ? 'سباكة' : 'Plumbing', icon: '🚰' },
    { id: 'electrical', label: isAr ? 'كهرباء' : 'Electrical', icon: '⚡' },
    { id: 'it_support', label: isAr ? 'دعم فني' : 'IT Support', icon: '💻' },
    { id: 'writing', label: isAr ? 'كتابة محتوى' : 'Writing', icon: '✍️' },
    { id: 'content_creation', label: isAr ? 'صناعة محتوى' : 'Content', icon: '🤳' },
    { id: 'catering', label: isAr ? 'تموين وطبخ' : 'Catering', icon: '🍲' },
    { id: 'photography', label: isAr ? 'تصوير' : 'Photography', icon: '📸' },
    { id: 'ac', label: isAr ? 'تكييف' : 'AC Repair', icon: '❄️' },
    { id: 'cleaning', label: isAr ? 'تنظيف' : 'Cleaning', icon: '🧹' },
    { id: 'tutoring', label: isAr ? 'تدريس خصوصي' : 'Tutoring', icon: '📚' },
  ];

  const featuredWorkers = [
    { id: 1, name: 'نورة العلي', rating: 4.9, jobs: 124, category: isAr ? 'خبيرة تجميل' : 'Makeup Artist', image: 'https://i.pravatar.cc/150?u=female1' },
    { id: 2, name: 'محمد العتيبي', rating: 4.9, jobs: 150, category: isAr ? 'سباك' : 'Plumber', image: 'https://i.pravatar.cc/150?u=1' },
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
              <Link
                key={cat.id}
                to="/client/post-job"
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl"
                >
                  {cat.icon}
                </motion.div>
                <span className="text-[10px] font-medium text-slate-600 text-center line-clamp-1">{cat.label}</span>
              </Link>
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
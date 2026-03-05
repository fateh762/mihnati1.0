"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore, Job } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Camera, MapPin, Clock, Info, Zap } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const PostJob = () => {
  const navigate = useNavigate();
  const { language } = useStore();
  const { addJob } = useJobStore();
  const [step, setStep] = useState(1);
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    title: '',
    description: '',
    priceType: 'fixed' as 'fixed' | 'bidding',
    price: '',
    location: isAr ? 'حي الملقا، الرياض' : 'Al Malqa, Riyadh',
    time: 'ASAP'
  });

  const categories = [
    {
      id: 'beauty_care',
      label: isAr ? 'الجمال والعناية' : 'Beauty & Care',
      icon: '💄',
      subs: [
        { id: 'makeup', label: isAr ? 'خبيرة تجميل' : 'Makeup Artist' },
        { id: 'hair_stylist', label: isAr ? 'مصففة شعر' : 'Hair Stylist' },
        { id: 'henna', label: isAr ? 'نقش حناء' : 'Henna Artist' },
        { id: 'home_salon', label: isAr ? 'صالون منزلي' : 'Home Salon' },
      ]
    },
    {
      id: 'home_maintenance',
      label: isAr ? 'صيانة المنزل' : 'Home Maintenance',
      icon: '🏠',
      subs: [
        { id: 'plumbing', label: isAr ? 'سباكة' : 'Plumbing' },
        { id: 'electrical', label: isAr ? 'كهرباء' : 'Electrical' },
        { id: 'ac', label: isAr ? 'تكييف وتبريد' : 'AC & Cooling' },
        { id: 'cleaning', label: isAr ? 'تنظيف وتعقيم' : 'Cleaning' },
      ]
    },
    {
      id: 'professional',
      label: isAr ? 'خدمات مهنية' : 'Professional Services',
      icon: '💼',
      subs: [
        { id: 'it_support', label: isAr ? 'دعم فني وتقني' : 'IT Support' },
        { id: 'writing', label: isAr ? 'كتابة محتوى' : 'Content Writing' },
        { id: 'photography', label: isAr ? 'تصوير فوتوغرافي' : 'Photography' },
        { id: 'tutoring', label: isAr ? 'تدريس خصوصي' : 'Tutoring' },
      ]
    }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      const newJob: Job = {
        id: Math.random().toString(36).substr(2, 9),
        clientId: 'current-user',
        mainCategory: formData.mainCategory,
        subCategory: formData.subCategory,
        title: formData.title,
        description: formData.description,
        priceType: formData.priceType,
        price: formData.price ? parseInt(formData.price) : undefined,
        status: 'open',
        createdAt: new Date().toISOString(),
        bidsCount: 0,
        location: { lat: 24.7136, lng: 46.6753, address: formData.location },
        time: formData.time
      };
      addJob(newJob);
      showSuccess(isAr ? 'تم نشر الطلب بنجاح' : 'Job posted successfully');
      navigate('/client/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <header className="p-6 glass border-b border-white/5 flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-xl font-black text-white tracking-tight">
          {isAr ? 'نشر طلب جديد' : 'Deploy New Task'}
        </h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto relative z-10">
        <div className="mb-10 flex justify-between items-center px-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-500",
                step >= i ? "bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]" : "bg-white/5 text-slate-600 border border-white/5"
              )}>
                {i}
              </div>
              {i < 4 && <div className={cn("h-0.5 flex-1 mx-2 rounded-full transition-all duration-500", step > i ? "bg-teal-500" : "bg-white/5")} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{isAr ? 'اختر التصنيف' : 'Select Protocol'}</h2>
              {!formData.mainCategory ? (
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, mainCategory: cat.id })}
                      className="p-6 rounded-[2rem] border border-white/5 glass hover:border-white/10 transition-all duration-300 flex flex-col items-center gap-3 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <button 
                    onClick={() => setFormData({ ...formData, mainCategory: '', subCategory: '' })}
                    className="text-teal-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4"
                  >
                    <ChevronLeft size={14} /> {isAr ? 'العودة للتصنيفات الرئيسية' : 'Back to Main Categories'}
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.find(c => c.id === formData.mainCategory)?.subs.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setFormData({ ...formData, subCategory: sub.id })}
                        className={cn(
                          "p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-3 group",
                          formData.subCategory === sub.id 
                            ? "border-teal-500/50 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.1)]" 
                            : "border-white/5 glass hover:border-white/10"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 text-center">{sub.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{isAr ? 'تفاصيل الطلب' : 'Task Parameters'}</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{isAr ? 'عنوان الطلب' : 'Task Title'}</Label>
                  <Input 
                    className="h-14 rounded-2xl bg-white/5 border-white/5 text-white placeholder:text-slate-700 focus:ring-teal-500/50" 
                    placeholder={isAr ? 'مثال: سائق للمطار' : 'e.g. Driver to Airport'}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{isAr ? 'الوصف' : 'Data Description'}</Label>
                  <Textarea 
                    className="rounded-2xl min-h-[140px] bg-white/5 border-white/5 text-white placeholder:text-slate-700 focus:ring-teal-500/50" 
                    placeholder={isAr ? 'اشرح المشكلة بالتفصيل...' : 'Describe the requirements in detail...'}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{isAr ? 'الموقع والوقت' : 'Spatio-Temporal Sync'}</h2>
              <div className="space-y-4">
                <div className="p-5 glass rounded-[2rem] flex items-center gap-4 border border-white/5">
                  <div className="p-3 bg-teal-500/10 text-teal-400 rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{isAr ? 'موقع العمل' : 'Target Location'}</p>
                    <p className="font-bold text-white text-sm">{formData.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{isAr ? 'خيارات التسعير' : 'Credit Allocation'}</h2>
              <RadioGroup 
                value={formData.priceType} 
                onValueChange={(val: 'fixed' | 'bidding') => setFormData({ ...formData, priceType: val })}
                className="grid gap-4"
              >
                <Label
                  className={cn(
                    "flex items-center justify-between p-6 rounded-[2rem] border transition-all cursor-pointer",
                    formData.priceType === 'fixed' ? "border-teal-500/50 bg-teal-500/10" : "border-white/5 glass"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="fixed" className="border-teal-500 text-teal-500" />
                    <div>
                      <p className="font-black text-white uppercase tracking-tight">{isAr ? 'سعر ثابت' : 'Fixed Credits'}</p>
                    </div>
                  </div>
                </Label>

                <Label
                  className={cn(
                    "flex items-center justify-between p-6 rounded-[2rem] border transition-all cursor-pointer",
                    formData.priceType === 'bidding' ? "border-teal-500/50 bg-teal-500/10" : "border-white/5 glass"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="bidding" className="border-teal-500 text-teal-500" />
                    <div>
                      <p className="font-black text-white uppercase tracking-tight">{isAr ? 'نظام المزايدة' : 'Neural Bidding'}</p>
                    </div>
                  </div>
                </Label>
              </RadioGroup>

              {formData.priceType === 'fixed' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{isAr ? 'الميزانية (ريال)' : 'Budget (SAR)'}</Label>
                  <Input 
                    type="number" 
                    className="h-16 text-3xl font-black rounded-2xl bg-white/5 border-white/5 text-white focus:ring-teal-500/50 text-center" 
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 glass border-t border-white/5 sticky bottom-0 z-20">
        <Button 
          onClick={handleNext}
          disabled={step === 1 && !formData.subCategory}
          className="w-full h-16 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_0_30px_rgba(20,184,166,0.3)] border-t border-white/20"
        >
          {step === 4 ? (isAr ? 'تأكيد ونشر' : 'Confirm & Deploy') : (isAr ? 'التالي' : 'Next Phase')}
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Camera, MapPin, Clock, Info } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const PostJob = () => {
  const navigate = useNavigate();
  const { language } = useStore();
  const { addJob } = useJobStore();
  const [step, setStep] = useState(1);
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priceType: 'fixed',
    price: '',
    location: 'حي الملقا، الرياض',
    time: 'ASAP'
  });

  const categories = [
    { id: 'plumbing', label: isAr ? 'سباكة' : 'Plumbing', icon: '🚰' },
    { id: 'electrical', label: isAr ? 'كهرباء' : 'Electrical', icon: '⚡' },
    { id: 'it_support', label: isAr ? 'دعم فني' : 'IT Support', icon: '💻' },
    { id: 'writing', label: isAr ? 'كتابة محتوى' : 'Writing', icon: '✍️' },
    { id: 'content_creation', label: isAr ? 'صناعة محتوى' : 'Content', icon: '🤳' },
    { id: 'catering', label: isAr ? 'تموين وطبخ' : 'Catering', icon: '🍲' },
    { id: 'drivers', label: isAr ? 'سائقين' : 'Drivers', icon: '🚗' },
    { id: 'delivery', label: isAr ? 'توصيل' : 'Delivery', icon: '📦' },
    { id: 'moving', label: isAr ? 'نقل عفش' : 'Moving', icon: '🚛' },
    { id: 'photography', label: isAr ? 'تصوير' : 'Photography', icon: '📸' },
    { id: 'design', label: isAr ? 'تصميم' : 'Design', icon: '🎨' },
    { id: 'translation', label: isAr ? 'ترجمة' : 'Translation', icon: '🌐' },
    { id: 'ac', label: isAr ? 'تكييف' : 'AC Repair', icon: '❄️' },
    { id: 'cleaning', label: isAr ? 'تنظيف' : 'Cleaning', icon: '🧹' },
    { id: 'tutoring', label: isAr ? 'تدريس خصوصي' : 'Tutoring', icon: '📚' },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      const newJob = {
        id: Math.random().toString(36).substr(2, 9),
        clientId: 'current-user',
        ...formData,
        price: formData.price ? parseInt(formData.price) : undefined,
        status: 'open' as const,
        createdAt: new Date().toISOString(),
        bidsCount: 0,
        location: { lat: 24.7136, lng: 46.6753, address: formData.location }
      };
      addJob(newJob);
      showSuccess(isAr ? 'تم نشر الطلب بنجاح' : 'Job posted successfully');
      navigate('/client/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      <header className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h1 className="text-xl font-bold text-slate-800">
          {isAr ? 'نشر طلب جديد' : 'Post New Job'}
        </h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-8 flex justify-between items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                step >= i ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-500"
              )}>
                {i}
              </div>
              {i < 4 && <div className={cn("h-1 flex-1 mx-2 rounded-full", step > i ? "bg-teal-600" : "bg-slate-200")} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">{isAr ? 'اختر التصنيف' : 'Select Category'}</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                      formData.category === cat.id ? "border-teal-600 bg-teal-50" : "border-white bg-white shadow-sm"
                    )}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="font-medium text-slate-700 text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">{isAr ? 'تفاصيل الطلب' : 'Job Details'}</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{isAr ? 'عنوان الطلب' : 'Job Title'}</Label>
                  <Input 
                    className="h-12 rounded-xl" 
                    placeholder={isAr ? 'مثال: إصلاح صنبور مياه' : 'e.g. Fix water tap'}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isAr ? 'الوصف' : 'Description'}</Label>
                  <Textarea 
                    className="rounded-xl min-h-[120px]" 
                    placeholder={isAr ? 'اشرح المشكلة بالتفصيل...' : 'Describe the issue in detail...'}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-2 text-slate-400 bg-white">
                  <Camera size={32} />
                  <span className="text-sm">{isAr ? 'إضافة صور (اختياري)' : 'Add Photos (Optional)'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">{isAr ? 'الموقع والوقت' : 'Location & Time'}</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 border border-slate-100">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{isAr ? 'موقع العمل' : 'Job Location'}</p>
                    <p className="font-medium text-slate-800">{formData.location}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-teal-600">{isAr ? 'تغيير' : 'Change'}</Button>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 border border-slate-100">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <Clock size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{isAr ? 'الموعد المفضل' : 'Preferred Time'}</p>
                    <p className="font-medium text-slate-800">{isAr ? 'في أقرب وقت' : 'As soon as possible'}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-teal-600">{isAr ? 'تغيير' : 'Change'}</Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800">{isAr ? 'خيارات التسعير' : 'Pricing Options'}</h2>
              <RadioGroup 
                value={formData.priceType} 
                onValueChange={(val) => setFormData({ ...formData, priceType: val as 'fixed' | 'bidding' })}
                className="grid gap-4"
              >
                <Label
                  className={cn(
                    "flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all",
                    formData.priceType === 'fixed' ? "border-teal-600 bg-teal-50" : "border-white bg-white shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="fixed" />
                    <div>
                      <p className="font-bold text-slate-800">{isAr ? 'سعر ثابت' : 'Fixed Price'}</p>
                      <p className="text-xs text-slate-500">{isAr ? 'حدد ميزانيتك للعمل' : 'Set your budget for the job'}</p>
                    </div>
                  </div>
                </Label>

                <Label
                  className={cn(
                    "flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all",
                    formData.priceType === 'bidding' ? "border-teal-600 bg-teal-50" : "border-white bg-white shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="bidding" />
                    <div>
                      <p className="font-bold text-slate-800">{isAr ? 'نظام المزايدة' : 'Bidding System'}</p>
                      <p className="text-xs text-slate-500">{isAr ? 'دع الفنيين يقدمون عروضهم' : 'Let experts propose their prices'}</p>
                    </div>
                  </div>
                </Label>
              </RadioGroup>

              {formData.priceType === 'fixed' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <Label>{isAr ? 'الميزانية (ريال)' : 'Budget (SAR)'}</Label>
                  <Input 
                    type="number" 
                    className="h-14 text-2xl font-bold rounded-xl" 
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </motion.div>
              )}

              <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 text-blue-800 text-sm">
                <Info className="shrink-0" size={20} />
                <p>{isAr ? 'سيتم إضافة رسوم توصيل بسيطة بناءً على مسافة الفني.' : 'A small transport fee will be added based on the expert\'s distance.'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <Button 
          onClick={handleNext}
          disabled={step === 1 && !formData.category}
          className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-lg"
        >
          {step === 4 ? (isAr ? 'تأكيد ونشر' : 'Confirm & Post') : (isAr ? 'التالي' : 'Next')}
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
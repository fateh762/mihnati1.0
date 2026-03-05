import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Camera, Upload, CheckCircle2 } from 'lucide-react';
import { categories } from '@/data/categories';

const WorkerRegistration = () => {
  const navigate = useNavigate();
  const { language } = useStore();
  const [step, setStep] = useState(1);
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    mainCategory: '',
    subCategory: '',
    jobId: ''
  });

  const selectedCategory = useMemo(() => 
    categories.find(c => c.id === formData.mainCategory),
  [formData.mainCategory]);

  const selectedSubCategory = useMemo(() => 
    selectedCategory?.subcategories.find(s => s.id === formData.subCategory),
  [selectedCategory, formData.subCategory]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/worker/dashboard');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            {isAr ? 'إكمال الملف الشخصي' : 'Complete Profile'}
          </h1>
          <span className="text-teal-600 font-bold">{step}/3</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-teal-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-teal-50 relative">
              <Camera className="text-slate-400" size={40} />
              <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full shadow-lg">
                <Upload size={16} />
              </button>
            </div>
            <p className="text-sm text-slate-500">{isAr ? 'صورة الملف الشخصي' : 'Profile Photo'}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{isAr ? 'الاسم الكامل (بالعربية)' : 'Full Name (Arabic)'}</Label>
              <Input className="h-12 rounded-xl" placeholder="أحمد محمد" />
            </div>
            <div className="space-y-2">
              <Label>{isAr ? 'الاسم الكامل (بالانجليزية)' : 'Full Name (English)'}</Label>
              <Input className="h-12 rounded-xl" placeholder="Ahmed Mohamed" />
            </div>
            <div className="space-y-2">
              <Label>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
              <Input type="email" className="h-12 rounded-xl" placeholder="example@mail.com" />
            </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{isAr ? 'نوع الهوية' : 'ID Type'}</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder={isAr ? 'اختر النوع' : 'Select Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi">{isAr ? 'هوية وطنية' : 'Saudi ID'}</SelectItem>
                  <SelectItem value="iqama">{isAr ? 'إقامة' : 'Iqama'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isAr ? 'رقم الهوية' : 'ID Number'}</Label>
              <Input className="h-12 rounded-xl" placeholder="1XXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>{isAr ? 'رقم الآيبان (IBAN)' : 'IBAN Number'}</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">SA</span>
                <Input className="pl-12 h-12 rounded-xl" placeholder="XXXXXXXXXXXXXXXXXXXXXX" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{isAr ? 'التخصص الرئيسي' : 'Main Category'}</Label>
              <Select onValueChange={(val) => setFormData({ ...formData, mainCategory: val, subCategory: '', jobId: '' })}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder={isAr ? 'اختر التخصص' : 'Select Category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{isAr ? cat.name_ar : cat.name_en}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {formData.mainCategory && (
              <div className="space-y-2">
                <Label>{isAr ? 'التخصص الفرعي' : 'Sub Category'}</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, subCategory: val, jobId: '' })}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder={isAr ? 'اختر التخصص الفرعي' : 'Select Sub Category'} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories.map(sub => (
                      <SelectItem key={sub.id} value={sub.id}>{isAr ? sub.name_ar : sub.name_en}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.subCategory && (
              <div className="space-y-2">
                <Label>{isAr ? 'المهنة المحددة' : 'Specific Job'}</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, jobId: val })}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder={isAr ? 'اختر المهنة' : 'Select Job'} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSubCategory?.jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>{isAr ? job.name_ar : job.name_en}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>{isAr ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
              <Input type="number" className="h-12 rounded-xl" placeholder="0" />
            </div>
            
            <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100 flex items-start gap-4">
              <CheckCircle2 className="text-teal-600 shrink-0" />
              <p className="text-sm text-teal-800 leading-relaxed">
                {isAr 
                  ? 'سيتم مراجعة بياناتك من قبل فريقنا وتفعيل حسابك خلال 24 ساعة.' 
                  : 'Your data will be reviewed by our team and your account will be activated within 24 hours.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-auto pt-8 flex gap-4">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={() => setStep(step - 1)}
            className="flex-1 h-14 rounded-xl border-slate-200"
          >
            {isAr ? 'السابق' : 'Back'}
          </Button>
        )}
        <Button 
          onClick={handleNext}
          disabled={step === 3 && !formData.jobId}
          className="flex-[2] h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-md"
        >
          {step === 3 ? (isAr ? 'إرسال للطلب' : 'Submit Application') : (isAr ? 'التالي' : 'Next')}
        </Button>
      </div>
    </div>
  );
};

export default WorkerRegistration;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useStore();
  const [step, setStep] = useState(0);
  const isAr = language === 'ar';

  const onboardingSteps = [
    {
      title: isAr ? 'مرحباً بك في مهنتي' : 'Welcome to Mihnati',
      description: isAr ? 'منصتك الموثوقة للخدمات المهنية في المملكة' : 'Your trusted platform for professional services in KSA',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: isAr ? 'ابحث عن خبراء' : 'Find Experts',
      description: isAr ? 'آلاف الفنيين المعتمدين في انتظار خدمتك' : 'Thousands of certified technicians waiting to serve you',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: isAr ? 'ابدأ عملك الخاص' : 'Start Your Business',
      description: isAr ? 'سجل كمزود خدمة وزد دخلك اليوم' : 'Register as a service provider and increase your income today',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=60',
    }
  ];

  const nextStep = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <div className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-700">مهنتي</div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="text-slate-500"
        >
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: isAr ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? -100 : 100 }}
            className="absolute inset-0 flex flex-col items-center p-8 text-center"
          >
            <div className="w-full aspect-square rounded-3xl overflow-hidden mb-8 shadow-2xl">
              <img 
                src={onboardingSteps[step].image} 
                alt="onboarding" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              {onboardingSteps[step].title}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              {onboardingSteps[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <div className="flex justify-center gap-2 mb-4">
          {onboardingSteps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-teal-600" : "w-2 bg-slate-200"
              )}
            />
          ))}
        </div>
        <Button 
          onClick={nextStep}
          className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700 rounded-2xl shadow-lg"
        >
          {step === onboardingSteps.length - 1 ? (isAr ? 'ابدأ الآن' : 'Get Started') : (isAr ? 'التالي' : 'Next')}
          {isAr ? <ChevronLeft className="mr-2" /> : <ChevronRight className="ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default Index;
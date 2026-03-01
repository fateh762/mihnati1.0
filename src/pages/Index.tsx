import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useStore();
  const [step, setStep] = useState(0);
  const isAr = language === 'ar';

  const onboardingSteps = [
    {
      title: isAr ? 'مستقبل الخدمات' : 'Future of Services',
      description: isAr ? 'منصة ذكية تربطك بأفضل المحترفين في ثوانٍ' : 'Smart platform connecting you with top pros in seconds',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
      accent: 'from-teal-500 to-cyan-500'
    },
    {
      title: isAr ? 'دقة متناهية' : 'Extreme Precision',
      description: isAr ? 'تتبع مباشر ونظام دفع آمن بالكامل' : 'Live tracking and fully secure payment system',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
      accent: 'from-indigo-500 to-purple-500'
    },
    {
      title: isAr ? 'انطلق الآن' : 'Launch Now',
      description: isAr ? 'انضم لآلاف المستخدمين في رحلة التميز' : 'Join thousands of users in the journey of excellence',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60',
      accent: 'from-orange-500 to-red-500'
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
    <div className="min-h-screen bg-[#02040a] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div className="text-xl font-black tracking-tighter text-white uppercase">Mihnati</div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="text-slate-400 hover:text-white hover:bg-white/5 rounded-full px-4"
        >
          {language === 'ar' ? 'EN' : 'AR'}
        </Button>
      </div>

      <div className="flex-1 relative flex flex-col justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-full aspect-square mb-12 group">
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700",
                onboardingSteps[step].accent
              )} />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={onboardingSteps[step].image} 
                  alt="onboarding" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
              </div>
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black text-white mb-4 tracking-tight"
            >
              {onboardingSteps[step].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-lg leading-relaxed font-medium"
            >
              {onboardingSteps[step].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 flex flex-col gap-6 relative z-10">
        <div className="flex justify-center gap-3">
          {onboardingSteps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === step ? "w-10 bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" : "w-3 bg-white/10"
              )}
            />
          ))}
        </div>
        <Button 
          onClick={nextStep}
          className="w-full h-16 text-lg bg-teal-500 hover:bg-teal-400 text-white rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.3)] border-t border-white/20 group"
        >
          <span className="font-bold uppercase tracking-widest">
            {step === onboardingSteps.length - 1 ? (isAr ? 'ابدأ الرحلة' : 'Launch App') : (isAr ? 'التالي' : 'Next')}
          </span>
          {isAr ? (
            <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Index;
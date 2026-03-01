import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Briefcase, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const { language, setUserType } = useStore();
  const isAr = language === 'ar';

  const handleSelect = (type: 'worker' | 'client') => {
    setUserType(type);
    navigate(type === 'worker' ? '/worker/register' : '/client/register');
  };

  return (
    <div className="min-h-screen bg-[#02040a] p-8 flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mb-12 mt-8 text-center relative z-10">
        <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.4)] mx-auto mb-6">
          <Zap size={24} className="text-white fill-white" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
          {isAr ? 'حدد هويتك الرقمية' : 'Define Your Identity'}
        </h1>
        <p className="text-slate-500 font-medium">
          {isAr ? 'اختر نوع الحساب للبدء في المنصة' : 'Choose your account protocol to begin'}
        </p>
      </div>

      <div className="grid gap-6 relative z-10">
        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('client')}
          className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-teal-500/50 transition-all text-right flex items-center gap-6 group"
        >
          <div className="bg-teal-500/10 p-5 rounded-2xl text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-500">
            <User size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {isAr ? 'أنا عميل' : 'Client Node'}
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              {isAr ? 'أبحث عن خبراء تقنيين' : 'Seeking expert protocols'}
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('worker')}
          className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-indigo-500/50 transition-all text-right flex items-center gap-6 group"
        >
          <div className="bg-indigo-500/10 p-5 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
            <Briefcase size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {isAr ? 'أنا مزود خدمة' : 'Expert Node'}
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              {isAr ? 'تقديم الخدمات والحلول' : 'Deploying service solutions'}
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
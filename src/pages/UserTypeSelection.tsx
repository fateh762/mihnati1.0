import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Briefcase, User } from 'lucide-react';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const { language, setUserType } = useStore();
  const isAr = language === 'ar';

  const handleSelect = (type: 'worker' | 'client') => {
    setUserType(type);
    navigate(type === 'worker' ? '/worker/register' : '/client/register');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col max-w-md mx-auto">
      <div className="mb-12 mt-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {isAr ? 'كيف تود استخدام مهنتي؟' : 'How would you like to use Mihnati?'}
        </h1>
        <p className="text-slate-500">
          {isAr ? 'اختر نوع الحساب المناسب لك' : 'Choose the account type that fits you'}
        </p>
      </div>

      <div className="grid gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('client')}
          className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-teal-500 transition-all text-right flex items-center gap-6"
        >
          <div className="bg-teal-50 p-4 rounded-2xl text-teal-600">
            <User size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">
              {isAr ? 'أنا عميل' : 'I am a Client'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isAr ? 'أبحث عن فنيين لإنجاز مهامي' : 'I am looking for experts to do my jobs'}
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('worker')}
          className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-orange-500 transition-all text-right flex items-center gap-6"
        >
          <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
            <Briefcase size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">
              {isAr ? 'أنا مزود خدمة' : 'I am a Provider'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isAr ? 'أريد تقديم خدماتي وزيادة دخلي' : 'I want to offer my services and earn'}
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
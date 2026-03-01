import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const ClientRegistration = () => {
  const navigate = useNavigate();
  const { language } = useStore();
  const isAr = language === 'ar';

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col max-w-md mx-auto">
      <div className="mb-12 mt-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {isAr ? 'أهلاً بك معنا' : 'Welcome Aboard'}
        </h1>
        <p className="text-slate-500">
          {isAr ? 'أكمل بياناتك للبدء في طلب الخدمات' : 'Complete your details to start requesting services'}
        </p>
      </div>

      <form onSubmit={handleComplete} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{isAr ? 'الاسم الكامل' : 'Full Name'}</Label>
            <Input className="h-14 rounded-xl border-slate-200" placeholder={isAr ? 'أدخل اسمك' : 'Enter your name'} required />
          </div>
          <div className="space-y-2">
            <Label>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
            <Input type="email" className="h-14 rounded-xl border-slate-200" placeholder="example@mail.com" required />
          </div>
        </div>

        <Button type="submit" className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-md mt-8">
          {isAr ? 'ابدأ الآن' : 'Start Now'}
        </Button>
      </form>
    </div>
  );
};

export default ClientRegistration;
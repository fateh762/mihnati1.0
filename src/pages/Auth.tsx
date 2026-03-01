import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';
import { Globe } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setUser } = useStore();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const isAr = language === 'ar';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setStep('otp');
      showSuccess(isAr ? 'تم إرسال رمز التحقق' : 'Verification code sent');
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Mock user data
      setUser({ id: '1', phone, name: '' });
      navigate('/user-type');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col max-w-md mx-auto">
      <div className="flex justify-end mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="text-slate-500 flex items-center gap-2"
        >
          <Globe size={16} />
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </div>

      <div className="mb-12 mt-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {step === 'phone' 
            ? (isAr ? 'تسجيل الدخول' : 'Login') 
            : (isAr ? 'تحقق من رقمك' : 'Verify Phone')}
        </h1>
        <p className="text-slate-500">
          {step === 'phone'
            ? (isAr ? 'أدخل رقم جوالك للمتابعة' : 'Enter your mobile number to continue')
            : (isAr ? `أدخل الرمز المرسل إلى ${phone}` : `Enter the code sent to ${phone}`)}
        </p>
      </div>

      {step === 'phone' ? (
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSendOtp} 
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label>{isAr ? 'رقم الجوال' : 'Mobile Number'}</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                +966
              </span>
              <Input
                type="tel"
                placeholder="5XXXXXXXX"
                className="pl-16 h-14 text-lg rounded-xl border-slate-200 focus:ring-teal-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-md">
            {isAr ? 'إرسال الرمز' : 'Send Code'}
          </Button>
        </motion.form>
      ) : (
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleVerify} 
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label>{isAr ? 'رمز التحقق' : 'Verification Code'}</Label>
            <Input
              type="text"
              placeholder="XXXX"
              className="h-14 text-center text-2xl tracking-[1em] rounded-xl border-slate-200 focus:ring-teal-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              required
            />
          </div>
          <Button type="submit" className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl text-lg shadow-md">
            {isAr ? 'تحقق' : 'Verify'}
          </Button>
          <button 
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-center text-teal-600 font-medium"
          >
            {isAr ? 'تغيير رقم الجوال' : 'Change Mobile Number'}
          </button>
        </motion.form>
      )}

      <div className="mt-auto pt-8 text-center text-slate-400 text-sm">
        {isAr ? 'بالاستمرار، أنت توافق على الشروط والأحكام' : 'By continuing, you agree to the Terms & Conditions'}
      </div>
    </div>
  );
};

export default Auth;
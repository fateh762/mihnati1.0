import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { showSuccess } from '@/utils/toast';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setUser } = useStore();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
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
      setUser({ id: '1', phone, name: '' });
      navigate('/user-type');
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] p-8 flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
            <Zap size={18} className="text-white fill-white" />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="text-slate-500 hover:text-white hover:bg-white/5 rounded-full flex items-center gap-2"
        >
          <Globe size={16} />
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </div>

      <div className="mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-white/5 mb-4"
        >
          <ShieldCheck size={12} className="text-teal-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Secure Access</span>
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
          {step === 'phone' 
            ? (isAr ? 'تسجيل الدخول' : 'Identity Check') 
            : (isAr ? 'تحقق من رقمك' : 'Verification')}
        </h1>
        <p className="text-slate-500 font-medium">
          {step === 'phone'
            ? (isAr ? 'أدخل رقم جوالك للمتابعة' : 'Enter your mobile credentials')
            : (isAr ? `أدخل الرمز المرسل إلى ${phone}` : `Enter the code sent to ${phone}`)}
        </p>
      </div>

      <div className="relative z-10">
        {step === 'phone' ? (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSendOtp} 
            className="space-y-8"
          >
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                {isAr ? 'رقم الجوال' : 'Mobile Number'}
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400 font-black text-sm tracking-tighter">
                    +966
                  </span>
                  <Input
                    type="tel"
                    placeholder="5XXXXXXXX"
                    className="pl-16 h-16 text-lg rounded-2xl border-white/5 bg-white/5 backdrop-blur-xl text-white focus:ring-teal-500/50"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                    required
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full h-16 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.2)] border-t border-white/20 font-black uppercase tracking-widest">
              {isAr ? 'إرسال الرمز' : 'Request Access'}
            </Button>
          </motion.form>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleVerify} 
            className="space-y-8"
          >
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                {isAr ? 'رمز التحقق' : 'Security Code'}
              </Label>
              <Input
                type="text"
                placeholder="XXXX"
                className="h-16 text-center text-3xl font-black tracking-[0.5em] rounded-2xl border-white/5 bg-white/5 backdrop-blur-xl text-white focus:ring-teal-500/50"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                required
              />
            </div>
            <Button type="submit" className="w-full h-16 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.2)] border-t border-white/20 font-black uppercase tracking-widest">
              {isAr ? 'تحقق' : 'Authorize'}
            </Button>
            <button 
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-teal-400 transition-colors"
            >
              {isAr ? 'تغيير رقم الجوال' : 'Change Credentials'}
            </button>
          </motion.form>
        )}
      </div>

      <div className="mt-auto pt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest relative z-10">
        {isAr ? 'بالاستمرار، أنت توافق على بروتوكولات الخدمة' : 'By continuing, you agree to service protocols'}
      </div>
    </div>
  );
};

export default Auth;
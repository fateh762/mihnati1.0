import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe, LogOut, User, Shield, Bell, HelpCircle, ChevronRight, ChevronLeft, CreditCard, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ClientProfile = () => {
  const { language, setLanguage, logout } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: isAr ? 'تعديل الملف الشخصي' : 'Identity Config', color: 'text-blue-400' },
    { icon: CreditCard, label: isAr ? 'طرق الدفع' : 'Payment Protocols', color: 'text-emerald-400' },
    { icon: Bell, label: isAr ? 'التنبيهات' : 'Neural Alerts', color: 'text-orange-400' },
    { icon: Shield, label: isAr ? 'الخصوصية والأمان' : 'Security Matrix', color: 'text-indigo-400' },
    { icon: HelpCircle, label: isAr ? 'مركز المساعدة' : 'Support Node', color: 'text-pink-400' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="text-center space-y-6 pt-4">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="w-28 h-28 rounded-[2.5rem] glass p-1 border-teal-500/30 relative">
              <img src="https://i.pravatar.cc/150?u=client" alt="avatar" className="w-full h-full rounded-[2.2rem] object-cover" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center border-4 border-[#02040a] shadow-lg">
                <Zap size={14} className="text-white fill-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">سارة الأحمد</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Client Node #8291</p>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 px-2">{isAr ? 'الإعدادات' : 'System Config'}</h2>
          
          <Card className="overflow-hidden glass border-white/5 rounded-[2.5rem]">
            <button 
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <span className="font-bold text-white tracking-tight">{isAr ? 'اللغة' : 'Language Sync'}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">{isAr ? 'العربية' : 'English'}</span>
                {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </div>
            </button>

            {menuItems.map((item, i) => (
              <button 
                key={i}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors border-t border-white/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-white tracking-tight">{item.label}</span>
                </div>
                <div className="text-slate-600 group-hover:text-teal-400 transition-colors">
                  {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </div>
              </button>
            ))}
          </Card>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full h-16 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[2rem] flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            {isAr ? 'تسجيل الخروج' : 'Terminate Session'}
          </Button>
        </section>
      </div>
    </MobileLayout>
  );
};

export default ClientProfile;
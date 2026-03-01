import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe, LogOut, User, Shield, Bell, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkerProfile = () => {
  const { language, setLanguage, logout } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: isAr ? 'تعديل الملف الشخصي' : 'Edit Profile' },
    { icon: Bell, label: isAr ? 'التنبيهات' : 'Notifications' },
    { icon: Shield, label: isAr ? 'الخصوصية والأمان' : 'Privacy & Security' },
    { icon: HelpCircle, label: isAr ? 'مركز المساعدة' : 'Help Center' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <header className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-teal-100 border-4 border-white shadow-lg overflow-hidden mx-auto">
              <img src="https://i.pravatar.cc/150?u=worker" alt="avatar" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">أحمد محمد</h1>
            <p className="text-slate-500 text-sm">ahmed@example.com</p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 px-2">{isAr ? 'الإعدادات' : 'Settings'}</h2>
          
          <Card className="overflow-hidden border-none shadow-sm">
            <button 
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Globe size={20} />
                </div>
                <span className="font-medium text-slate-700">{isAr ? 'اللغة' : 'Language'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sm">{isAr ? 'العربية' : 'English'}</span>
                {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </div>
            </button>

            {menuItems.map((item, i) => (
              <button 
                key={i}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-t border-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="text-slate-400">
                  {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </div>
              </button>
            ))}
          </Card>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full h-14 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            {isAr ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </section>
      </div>
    </MobileLayout>
  );
};

export default WorkerProfile;
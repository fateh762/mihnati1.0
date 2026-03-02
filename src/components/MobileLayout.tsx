import React from 'react';
import { useStore } from '@/store/useStore';
import { Home, Search, Briefcase, User, Wallet, PlusCircle, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NotificationBell from '@/features/notifications/components/NotificationBell';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { userType, language } = useStore();
  const location = useLocation();
  const isAr = language === 'ar';

  const navItems = userType === 'worker' ? [
    { icon: Home, label: isAr ? 'الرئيسية' : 'Home', path: '/worker/dashboard' },
    { icon: Search, label: isAr ? 'استكشاف' : 'Explore', path: '/worker/explore' },
    { icon: Briefcase, label: isAr ? 'مهامي' : 'My Jobs', path: '/worker/jobs' },
    { icon: MessageSquare, label: isAr ? 'الرسائل' : 'Chat', path: '/messages' },
    { icon: User, label: isAr ? 'حسابي' : 'Profile', path: '/worker/profile' },
  ] : [
    { icon: Home, label: isAr ? 'الرئيسية' : 'Home', path: '/client/dashboard' },
    { icon: Search, label: isAr ? 'البحث' : 'Find', path: '/client/explore' },
    { icon: PlusCircle, label: isAr ? 'نشر طلب' : 'Post', primary: true, path: '/client/post-job' },
    { icon: MessageSquare, label: isAr ? 'الرسائل' : 'Chat', path: '/messages' },
    { icon: User, label: isAr ? 'حسابي' : 'Profile', path: '/client/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#02040a] font-sans max-w-md mx-auto relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="sticky top-0 z-20 flex justify-end px-4 pt-3 pb-1">
        <NotificationBell />
      </header>
      <main className="flex-1 pb-24 overflow-y-auto relative z-10">
        {children}
      </main>
      
      <nav className="fixed bottom-6 left-4 right-4 max-w-[calc(448px-2rem)] mx-auto glass rounded-[2rem] p-2 flex justify-around items-center z-50 shadow-2xl border-white/5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 relative group",
              location.pathname === item.path ? "text-teal-400" : "text-slate-500 hover:text-slate-300",
              item.primary && "bg-teal-500 text-white p-4 rounded-2xl -mt-12 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:scale-110 active:scale-95"
            )}
          >
            <item.icon size={item.primary ? 28 : 22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
            {!item.primary && (
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                {item.label}
              </span>
            )}
            {location.pathname === item.path && !item.primary && (
              <div className="absolute -bottom-1 w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileLayout;
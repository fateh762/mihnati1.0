import React from 'react';
import { useStore } from '@/store/useStore';
import { Home, Search, Briefcase, User, Wallet, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { userType, language } = useStore();
  const location = useLocation();
  const isAr = language === 'ar';

  const navItems = userType === 'worker' ? [
    { icon: Home, label: isAr ? 'الرئيسية' : 'Home', path: '/worker/dashboard' },
    { icon: Search, label: isAr ? 'استكشاف' : 'Explore', path: '/worker/explore' },
    { icon: Briefcase, label: isAr ? 'مهامي' : 'My Jobs', path: '/worker/jobs' },
    { icon: Wallet, label: isAr ? 'الأرباح' : 'Earnings', path: '/worker/earnings' },
    { icon: User, label: isAr ? 'حسابي' : 'Profile', path: '/worker/profile' },
  ] : [
    { icon: Home, label: isAr ? 'الرئيسية' : 'Home', path: '/client/dashboard' },
    { icon: Search, label: isAr ? 'البحث' : 'Find', path: '/client/explore' },
    { icon: PlusCircle, label: isAr ? 'نشر طلب' : 'Post Job', path: '/client/post-job', primary: true },
    { icon: Briefcase, label: isAr ? 'طلباتي' : 'My Jobs', path: '/client/jobs' },
    { icon: User, label: isAr ? 'حسابي' : 'Profile', path: '/client/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans max-w-md mx-auto border-x border-slate-200 shadow-xl">
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              location.pathname === item.path ? "text-teal-600" : "text-slate-400",
              item.primary && "bg-orange-500 text-white p-3 rounded-full -mt-10 shadow-lg hover:bg-orange-600"
            )}
          >
            <item.icon size={item.primary ? 28 : 22} />
            {!item.primary && <span className="text-[10px] font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileLayout;
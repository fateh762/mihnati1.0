import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const WorkerEarnings = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const transactions = [
    { id: 1, title: isAr ? 'إصلاح تسرب مياه' : 'Water Leak Repair', amount: '+150 SAR', date: '24 May, 2024', type: 'income' },
    { id: 2, title: isAr ? 'سحب رصيد' : 'Withdrawal', amount: '-500 SAR', date: '22 May, 2024', type: 'withdrawal' },
    { id: 3, title: isAr ? 'تنظيف مكيفات' : 'AC Cleaning', amount: '+300 SAR', date: '20 May, 2024', type: 'income' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold text-slate-800">{isAr ? 'الأرباح والمحفظة' : 'Earnings & Wallet'}</h1>

        <Card className="p-8 bg-gradient-to-br from-teal-600 to-teal-800 text-white border-none rounded-[32px] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-teal-100 text-sm mb-1">{isAr ? 'الرصيد المتاح' : 'Available Balance'}</p>
                <h2 className="text-4xl font-bold">2,450.00 <span className="text-lg font-normal">SAR</span></h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Wallet size={24} />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-white text-teal-700 hover:bg-teal-50 rounded-xl h-12 font-bold">
                {isAr ? 'سحب الرصيد' : 'Withdraw'}
              </Button>
              <Button variant="ghost" className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl h-12">
                <CreditCard size={20} />
              </Button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-none shadow-sm bg-white space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="p-1.5 bg-emerald-50 rounded-lg"><ArrowUpRight size={16} /></div>
              <span className="text-xs font-medium">{isAr ? 'دخل الشهر' : 'Monthly Income'}</span>
            </div>
            <p className="text-lg font-bold text-slate-800">4,200 SAR</p>
          </Card>
          <Card className="p-4 border-none shadow-sm bg-white space-y-2">
            <div className="flex items-center gap-2 text-orange-600">
              <div className="p-1.5 bg-orange-50 rounded-lg"><ArrowDownLeft size={16} /></div>
              <span className="text-xs font-medium">{isAr ? 'المسحوبات' : 'Withdrawals'}</span>
            </div>
            <p className="text-lg font-bold text-slate-800">1,750 SAR</p>
          </Card>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <History size={18} className="text-teal-600" />
              {isAr ? 'آخر العمليات' : 'Recent Transactions'}
            </h3>
            <button className="text-teal-600 text-sm font-medium">{isAr ? 'الكل' : 'See All'}</button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                whileHover={{ x: isAr ? -4 : 4 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    tx.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {tx.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{tx.title}</p>
                    <p className="text-[10px] text-slate-400">{tx.date}</p>
                  </div>
                </div>
                <div className={cn(
                  "font-bold",
                  tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                )}>
                  {tx.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default WorkerEarnings;
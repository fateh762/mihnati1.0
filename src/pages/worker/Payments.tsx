import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { usePaymentStore } from '@/store/usePaymentStore';
import { motion } from 'framer-motion';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  History,
  Lock,
  TrendingUp,
  Download,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

const earningsData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 1400 },
  { month: 'Apr', amount: 2200 },
  { month: 'May', amount: 1900 },
  { month: 'Jun', amount: 2450 },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-400',
  failed: 'bg-red-500/10 text-red-400',
  refunded: 'bg-slate-500/10 text-slate-400',
  in_escrow: 'bg-blue-500/10 text-blue-400',
};

const statusLabels = {
  ar: {
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    failed: 'فشل',
    refunded: 'مسترد',
    in_escrow: 'أمانة',
  },
  en: {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded',
    in_escrow: 'In Escrow',
  },
};

const WorkerPayments = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { balance, escrowBalance, transactions, withdraw } = usePaymentStore();
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      withdraw(500);
      setWithdrawing(false);
    }, 1200);
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          {isAr ? 'المحفظة والمدفوعات' : 'Wallet & Payments'}
        </h1>

        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-teal-600 to-teal-800 text-white border-none rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-teal-100 text-xs mb-1 font-medium uppercase tracking-wider">
                  {isAr ? 'الرصيد المتاح' : 'Available Balance'}
                </p>
                <h2 className="text-4xl font-black">
                  {balance.toLocaleString()}{' '}
                  <span className="text-lg font-medium text-teal-200">SAR</span>
                </h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Wallet size={24} />
              </div>
            </div>

            {/* Escrow indicator */}
            {escrowBalance > 0 && (
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Lock size={14} className="text-teal-200" />
                <span className="text-xs text-teal-100 font-medium">
                  {isAr
                    ? `${escrowBalance} SAR محجوز في الأمانة`
                    : `${escrowBalance} SAR held in escrow`}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-white text-teal-700 hover:bg-teal-50 rounded-xl h-12 font-black"
                onClick={handleWithdraw}
                disabled={withdrawing || balance < 500}
              >
                {withdrawing ? (isAr ? 'جارٍ السحب...' : 'Processing...') : isAr ? 'سحب الرصيد' : 'Withdraw'}
              </Button>
              <Button
                variant="ghost"
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl h-12"
              >
                <CreditCard size={20} />
              </Button>
              <Button
                variant="ghost"
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl h-12"
              >
                <Download size={20} />
              </Button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 glass border-white/5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <ArrowUpRight size={16} />
              </div>
              <span className="text-xs font-bold text-slate-400">
                {isAr ? 'دخل الشهر' : 'Monthly Income'}
              </span>
            </div>
            <p className="text-xl font-black text-white">4,200 SAR</p>
          </Card>
          <Card className="p-4 glass border-white/5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-orange-400">
              <div className="p-1.5 bg-orange-500/10 rounded-lg">
                <ArrowDownLeft size={16} />
              </div>
              <span className="text-xs font-bold text-slate-400">
                {isAr ? 'المسحوبات' : 'Withdrawals'}
              </span>
            </div>
            <p className="text-xl font-black text-white">1,750 SAR</p>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={16} className="text-teal-400" />
              {isAr ? 'الأرباح الشهرية' : 'Monthly Earnings'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#14b8a6' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#14b8a6"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Tabs */}
        <section className="space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="glass border-white/5 w-full">
              <TabsTrigger value="all" className="flex-1 text-xs font-bold">
                {isAr ? 'الكل' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="income" className="flex-1 text-xs font-bold">
                {isAr ? 'الدخل' : 'Income'}
              </TabsTrigger>
              <TabsTrigger value="withdrawal" className="flex-1 text-xs font-bold">
                {isAr ? 'السحب' : 'Withdraw'}
              </TabsTrigger>
            </TabsList>
            {['all', 'income', 'withdrawal'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
                {transactions
                  .filter((tx) => tab === 'all' || tx.type === tab || (tab === 'income' && tx.type === 'escrow_release'))
                  .map((tx) => (
                    <motion.div
                      key={tx.id}
                      whileHover={{ x: isAr ? -4 : 4 }}
                      className="glass border-white/5 rounded-2xl p-4 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'p-2.5 rounded-xl',
                            tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                          )}
                        >
                          {tx.amount > 0 ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">
                            {isAr ? tx.titleAr : tx.titleEn}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[10px] text-slate-500">
                              {new Date(tx.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                            </p>
                            <Badge
                              className={cn(
                                'text-[9px] border-none px-1.5 py-0',
                                statusColors[tx.status] || 'bg-slate-500/10 text-slate-400'
                              )}
                            >
                              {(isAr ? statusLabels.ar : statusLabels.en)[tx.status] || tx.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'font-black',
                          tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'
                        )}
                      >
                        {tx.amount > 0 ? '+' : ''}{tx.amount} SAR
                      </div>
                    </motion.div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </MobileLayout>
  );
};

export default WorkerPayments;

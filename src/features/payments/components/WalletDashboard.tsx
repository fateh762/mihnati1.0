import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { usePaymentStore } from '../store/usePaymentStore';
import { useStore } from '@/store/useStore';

export default function WalletDashboard({ onTopUp, onWithdraw }: { onTopUp: () => void; onWithdraw: () => void }) {
  const { wallet, fetchWallet, isLoading } = usePaymentStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  useEffect(() => { fetchWallet(); }, [fetchWallet]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="glass p-6 rounded-2xl border-white/5 bg-gradient-to-br from-teal-500/20 to-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-teal-500/20">
            <Wallet className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-slate-400 text-sm">{isAr ? 'رصيد المحفظة' : 'Wallet Balance'}</span>
        </div>
        {isLoading ? (
          <div className="h-10 w-32 bg-white/5 rounded-xl animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{wallet?.balance.toFixed(2) ?? '0.00'}</span>
            <span className="text-teal-400 font-medium">{wallet?.currency ?? 'SAR'}</span>
          </div>
        )}
        {wallet?.pendingBalance ? (
          <p className="text-slate-500 text-xs mt-1">
            {isAr ? `${wallet.pendingBalance} ر.س معلق` : `${wallet.pendingBalance} SAR pending`}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onTopUp}
          className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-2 hover:bg-teal-500/10 transition-colors"
        >
          <div className="p-2 rounded-xl bg-teal-500/20">
            <ArrowDownLeft className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-white text-sm font-medium">{isAr ? 'إيداع' : 'Top Up'}</span>
        </button>
        <button
          onClick={onWithdraw}
          className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-2 hover:bg-teal-500/10 transition-colors"
        >
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <ArrowUpRight className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-white text-sm font-medium">{isAr ? 'سحب' : 'Withdraw'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-4 rounded-2xl border-white/5">
          <TrendingUp className="w-4 h-4 text-teal-400 mb-2" />
          <p className="text-slate-400 text-xs">{isAr ? 'الدخل هذا الشهر' : 'Income this month'}</p>
          <p className="text-white font-bold mt-1">830 SAR</p>
        </div>
        <div className="glass p-4 rounded-2xl border-white/5">
          <TrendingDown className="w-4 h-4 text-red-400 mb-2" />
          <p className="text-slate-400 text-xs">{isAr ? 'المصاريف' : 'Expenses'}</p>
          <p className="text-white font-bold mt-1">200 SAR</p>
        </div>
      </div>
    </motion.div>
  );
}

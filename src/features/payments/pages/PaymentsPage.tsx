import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import WalletDashboard from '../components/WalletDashboard';
import TransactionHistory from '../components/TransactionHistory';
import PaymentForm from '../components/PaymentForm';
import WithdrawalForm from '../components/WithdrawalForm';
import { ArrowLeft } from 'lucide-react';

type Tab = 'wallet' | 'history' | 'topup' | 'withdraw';

export default function PaymentsPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const [tab, setTab] = useState<Tab>('wallet');

  const tabs = [
    { key: 'wallet' as Tab, label: isAr ? 'المحفظة' : 'Wallet' },
    { key: 'history' as Tab, label: isAr ? 'السجل' : 'History' },
  ];

  if (tab === 'topup' || tab === 'withdraw') {
    return (
      <MobileLayout>
        <div className="p-4">
          <button onClick={() => setTab('wallet')} className="flex items-center gap-2 text-slate-400 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{isAr ? 'رجوع' : 'Back'}</span>
          </button>
          <div className="glass p-6 rounded-2xl border-white/5">
            {tab === 'topup' ? <PaymentForm onSuccess={() => setTab('wallet')} /> : <WithdrawalForm onSuccess={() => setTab('wallet')} />}
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white">
          {isAr ? 'المدفوعات' : 'Payments'}
        </motion.h1>

        <div className="flex gap-2 bg-white/5 rounded-xl p-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-teal-500 text-white' : 'text-slate-400'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'wallet' && <WalletDashboard onTopUp={() => setTab('topup')} onWithdraw={() => setTab('withdraw')} />}
        {tab === 'history' && <TransactionHistory />}
      </div>
    </MobileLayout>
  );
}

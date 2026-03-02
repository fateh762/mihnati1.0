import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { usePaymentStore } from '../store/usePaymentStore';
import { useStore } from '@/store/useStore';
import { TransactionType } from '../types';

export default function TransactionHistory() {
  const { transactions, fetchTransactions, isLoading } = usePaymentStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [filter, setFilter] = useState<'all' | TransactionType>('all');

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const tabs: { key: 'all' | TransactionType; label: string; labelAr: string }[] = [
    { key: 'all', label: 'All', labelAr: 'الكل' },
    { key: 'income', label: 'Income', labelAr: 'دخل' },
    { key: 'expense', label: 'Expense', labelAr: 'مصروف' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${filter === tab.key ? 'bg-teal-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            {isAr ? tab.labelAr : tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.type === 'income' ? 'bg-teal-500/20' : tx.type === 'expense' ? 'bg-red-500/20' : 'bg-slate-500/20'}`}>
                  {tx.type === 'income' ? <ArrowDownLeft className="w-4 h-4 text-teal-400" /> :
                   tx.type === 'expense' ? <ArrowUpRight className="w-4 h-4 text-red-400" /> :
                   <Clock className="w-4 h-4 text-slate-400" />}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{isAr ? tx.descriptionAr : tx.description}</p>
                  <p className="text-slate-500 text-xs">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${tx.type === 'income' ? 'text-teal-400' : 'text-red-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}{tx.amount} {tx.currency}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-teal-500/20 text-teal-400' : tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {tx.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

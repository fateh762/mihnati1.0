import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Banknote, Building } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { usePaymentStore } from '../store/usePaymentStore';

const schema = z.object({
  amount: z.number().min(50, 'Minimum 50 SAR'),
  bankName: z.string().min(2, 'Bank name required'),
  iban: z.string().min(24, 'Invalid IBAN').max(34),
  accountHolder: z.string().min(2, 'Account holder required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function WithdrawalForm({ onSuccess }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { wallet, withdraw, isLoading } = usePaymentStore();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 100 },
  });

  const onSubmit = async (data: FormData) => {
    await withdraw(data.amount);
    setSuccess(true);
    onSuccess?.();
  };

  if (success) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-white text-lg font-bold">{isAr ? 'تم طلب السحب بنجاح' : 'Withdrawal Requested'}</h3>
        <p className="text-slate-400 text-sm mt-2">{isAr ? 'سيتم التحويل خلال 1-3 أيام عمل' : 'Transfer within 1-3 business days'}</p>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Banknote className="w-5 h-5 text-teal-400" />
        <h3 className="text-white font-semibold">{isAr ? 'سحب الأرباح' : 'Withdraw Earnings'}</h3>
      </div>

      <div className="glass p-3 rounded-xl border-white/5 flex items-center justify-between">
        <span className="text-slate-400 text-sm">{isAr ? 'الرصيد المتاح' : 'Available Balance'}</span>
        <span className="text-teal-400 font-bold">{wallet?.balance.toFixed(2) ?? '0'} SAR</span>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'المبلغ (ر.س)' : 'Amount (SAR)'}</label>
        <input {...register('amount', { valueAsNumber: true })} type="number" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50" />
        {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'اسم البنك' : 'Bank Name'}</label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input {...register('bankName')} placeholder={isAr ? 'مصرف الراجحي' : 'Al Rajhi Bank'} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 pl-10 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
        </div>
        {errors.bankName && <p className="text-red-400 text-xs mt-1">{errors.bankName.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">IBAN</label>
        <input {...register('iban')} placeholder="SA0000000000000000000000" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
        {errors.iban && <p className="text-red-400 text-xs mt-1">{errors.iban.message}</p>}
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">{isAr ? 'اسم صاحب الحساب' : 'Account Holder'}</label>
        <input {...register('accountHolder')} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
        {errors.accountHolder && <p className="text-red-400 text-xs mt-1">{errors.accountHolder.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-xl px-4 py-3 font-medium transition-colors"
      >
        {isLoading ? (isAr ? 'جارٍ المعالجة...' : 'Processing...') : (isAr ? 'تأكيد السحب' : 'Confirm Withdrawal')}
      </button>
    </motion.form>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { paymentService } from '../services/paymentService';

const schema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number').max(19),
  expiry: z.string().min(5, 'Invalid expiry'),
  cvv: z.string().min(3, 'Invalid CVV').max(4),
  name: z.string().min(2, 'Name required'),
  amount: z.number().min(10, 'Minimum 10 SAR'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  amount?: number;
  onSuccess?: (txId: string) => void;
}

export default function PaymentForm({ amount = 100, onSuccess }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await paymentService.processPayment(data.amount, 'card');
      setSuccess(true);
      onSuccess?.(result.transactionId);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="text-white text-lg font-bold">{isAr ? 'تمت الدفعة بنجاح' : 'Payment Successful'}</h3>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-teal-400" />
        <h3 className="text-white font-semibold">{isAr ? 'بيانات الدفع' : 'Payment Details'}</h3>
        <Lock className="w-4 h-4 text-slate-500 ml-auto" />
      </div>

      <div>
        <input {...register('name')} placeholder={isAr ? 'الاسم على البطاقة' : 'Cardholder Name'} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register('cardNumber')} placeholder="1234 5678 9012 3456" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" maxLength={19} />
        {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register('expiry')} placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
          {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry.message}</p>}
        </div>
        <div>
          <input {...register('cvv')} placeholder="CVV" type="password" maxLength={4} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50" />
          {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-xl px-4 py-3 font-medium transition-colors"
      >
        {loading ? (isAr ? 'جارٍ المعالجة...' : 'Processing...') : `${isAr ? 'ادفع' : 'Pay'} ${amount} SAR`}
      </button>
    </motion.form>
  );
}

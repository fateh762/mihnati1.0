import { create } from 'zustand';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'in_escrow';
export type PaymentMethod = 'card' | 'wallet' | 'bank_transfer';

export interface Transaction {
  id: string;
  type: 'income' | 'withdrawal' | 'escrow_hold' | 'escrow_release' | 'refund';
  titleAr: string;
  titleEn: string;
  amount: number;
  status: PaymentStatus;
  method?: PaymentMethod;
  jobId?: string;
  createdAt: string;
}

interface PaymentState {
  balance: number;
  escrowBalance: number;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  withdraw: (amount: number) => void;
}

const sampleTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'income',
    titleAr: 'إصلاح تسرب مياه',
    titleEn: 'Water Leak Repair',
    amount: 150,
    status: 'completed',
    method: 'card',
    jobId: '1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 't2',
    type: 'withdrawal',
    titleAr: 'سحب رصيد',
    titleEn: 'Withdrawal',
    amount: -500,
    status: 'completed',
    method: 'bank_transfer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 't3',
    type: 'income',
    titleAr: 'تنظيف مكيفات',
    titleEn: 'AC Cleaning',
    amount: 300,
    status: 'completed',
    method: 'wallet',
    jobId: '2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 't4',
    type: 'escrow_hold',
    titleAr: 'أمانة - سباكة حمام',
    titleEn: 'Escrow - Bathroom Plumbing',
    amount: 200,
    status: 'in_escrow',
    jobId: '3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 't5',
    type: 'income',
    titleAr: 'تركيب أثاث',
    titleEn: 'Furniture Assembly',
    amount: 250,
    status: 'completed',
    method: 'card',
    jobId: '4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 't6',
    type: 'refund',
    titleAr: 'استرداد - صيانة كهرباء',
    titleEn: 'Refund - Electrical Maintenance',
    amount: -80,
    status: 'refunded',
    jobId: '5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
];

export const usePaymentStore = create<PaymentState>((set) => ({
  balance: 2450,
  escrowBalance: 200,
  transactions: sampleTransactions,
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
      balance: tx.type === 'income' || tx.type === 'escrow_release'
        ? state.balance + tx.amount
        : state.balance,
    })),
  withdraw: (amount) =>
    set((state) => ({
      balance: state.balance - amount,
      transactions: [
        {
          id: `t${Date.now()}`,
          type: 'withdrawal',
          titleAr: 'سحب رصيد',
          titleEn: 'Withdrawal',
          amount: -amount,
          status: 'completed',
          method: 'bank_transfer',
          createdAt: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    })),
}));

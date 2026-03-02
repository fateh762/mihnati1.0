import { ID } from '@/shared/types';

export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type PaymentMethodType = 'card' | 'bank' | 'wallet';

export interface Transaction {
  id: ID;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  description: string;
  descriptionAr: string;
  date: string;
  from?: string;
  to?: string;
}

export interface PaymentMethod {
  id: ID;
  type: PaymentMethodType;
  label: string;
  last4?: string;
  isDefault: boolean;
}

export interface Wallet {
  balance: number;
  currency: string;
  pendingBalance: number;
}

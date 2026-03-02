import { create } from 'zustand';
import { Transaction, PaymentMethod, Wallet } from '../types';
import { paymentService } from '../services/paymentService';

interface PaymentState {
  wallet: Wallet | null;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  error: string | null;
  fetchWallet: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  topUp: (amount: number) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  wallet: null,
  transactions: [],
  paymentMethods: [],
  isLoading: false,
  error: null,

  fetchWallet: async () => {
    set({ isLoading: true });
    try {
      const wallet = await paymentService.getWallet();
      set({ wallet, isLoading: false });
    } catch (e) {
      set({ error: String(e), isLoading: false });
    }
  },

  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      const transactions = await paymentService.getTransactions();
      set({ transactions, isLoading: false });
    } catch (e) {
      set({ error: String(e), isLoading: false });
    }
  },

  fetchPaymentMethods: async () => {
    try {
      const paymentMethods = await paymentService.getPaymentMethods();
      set({ paymentMethods });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  topUp: async (amount: number) => {
    set({ isLoading: true });
    try {
      const wallet = await paymentService.topUp(amount);
      set({ wallet, isLoading: false });
    } catch (e) {
      set({ error: String(e), isLoading: false });
    }
  },

  withdraw: async (amount: number) => {
    set({ isLoading: true });
    try {
      await paymentService.withdraw(amount);
      set({ isLoading: false });
    } catch (e) {
      set({ error: String(e), isLoading: false });
    }
  },
}));

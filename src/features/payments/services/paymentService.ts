import { Transaction, PaymentMethod, Wallet } from '../types';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', status: 'completed', amount: 250, currency: 'SAR', description: 'Plumbing job payment', descriptionAr: 'دفعة عمل سباكة', date: '2024-01-15', from: 'Ahmed Al-Rashid' },
  { id: '2', type: 'expense', status: 'completed', amount: 50, currency: 'SAR', description: 'Platform fee', descriptionAr: 'رسوم المنصة', date: '2024-01-15' },
  { id: '3', type: 'income', status: 'completed', amount: 400, currency: 'SAR', description: 'Electrical work', descriptionAr: 'أعمال كهربائية', date: '2024-01-12', from: 'Sara Mohammed' },
  { id: '4', type: 'expense', status: 'pending', amount: 150, currency: 'SAR', description: 'Withdrawal request', descriptionAr: 'طلب سحب', date: '2024-01-10' },
  { id: '5', type: 'income', status: 'completed', amount: 180, currency: 'SAR', description: 'AC maintenance', descriptionAr: 'صيانة مكيف', date: '2024-01-08', from: 'Khalid Ibrahim' },
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'card', label: 'Visa •••• 4242', last4: '4242', isDefault: true },
  { id: '2', type: 'bank', label: 'Al Rajhi Bank', isDefault: false },
];

const mockWallet: Wallet = { balance: 1250.75, currency: 'SAR', pendingBalance: 150 };

export const paymentService = {
  getWallet: async (): Promise<Wallet> => {
    await delay(500);
    return mockWallet;
  },
  getTransactions: async (): Promise<Transaction[]> => {
    await delay(600);
    return mockTransactions;
  },
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay(400);
    return mockPaymentMethods;
  },
  topUp: async (amount: number): Promise<Wallet> => {
    await delay(800);
    return { ...mockWallet, balance: mockWallet.balance + amount };
  },
  withdraw: async (amount: number): Promise<{ success: boolean }> => {
    await delay(1000);
    if (amount > mockWallet.balance) throw new Error('Insufficient balance');
    return { success: true };
  },
  processPayment: async (amount: number, _method: string): Promise<{ success: boolean; transactionId: string }> => {
    await delay(1200);
    return { success: true, transactionId: `TXN-${Date.now()}` };
  },
};

export type PaymentProvider = 'zalopay' | 'telegram-stars';

export interface PaymentResult {
  success: boolean;
  orderId: string;
  transactionId?: string;
  amount: number;
  providerData?: any;
}

export interface PaymentStrategy {
  createPayment(orderData: CreatePaymentData): Promise<any>;
  verifyCallback?(data: any, signature: string): Promise<boolean>;
}

export interface CreatePaymentData {
  orderId: string;
  amount: number;
  items: any[];
  userId: string;
  description: string;
  appTransId?: string;
  title?: string;
  starsAmount?: number;
}

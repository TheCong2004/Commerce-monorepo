import { Bot } from 'grammy';
import { PaymentStrategy } from './index';
import { CreatePaymentData } from '../types';

export class TelegramStarsStrategy implements PaymentStrategy {
  private bot: Bot | null = null;
  constructor(private config?: { token?: string }) {}

  private getBot() {
    const token = this.config?.token || process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }
    if (!this.bot) {
      this.bot = new Bot(token);
    }
    return this.bot;
  }

  async createPayment(orderData: CreatePaymentData) {
    const bot = this.getBot();

    const invoiceLink = await bot.api.createInvoiceLink(
      orderData.title || 'Commerce Order',
      orderData.description || `Payment for order ${orderData.orderId}`,
      orderData.orderId,
      '', // provider_token is empty for Telegram Stars
      'XTR', // Currency for Telegram Stars
      [{ label: 'Total', amount: orderData.starsAmount || orderData.amount }]
    );

    return {
      invoiceLink,
      starsAmount: orderData.starsAmount || orderData.amount,
      orderId: orderData.orderId
    };
  }
}

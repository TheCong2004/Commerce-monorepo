import { PaymentStrategy } from './types';
import { ZaloPayStrategy } from './strategies/zalopay';
import { TelegramStarsStrategy } from './strategies/telegram-stars';

export * from './types';
export { ZaloPayStrategy, TelegramStarsStrategy };

export interface PaymentConfig {
  zalopay?: {
    appId?: string;
    key1?: string;
    key2?: string;
  };
  telegram?: {
    token?: string;
  };
}

export function getPaymentStrategies(config?: PaymentConfig): Record<string, PaymentStrategy> {
  return {
    zalopay: new ZaloPayStrategy(config?.zalopay),
    'telegram-stars': new TelegramStarsStrategy(config?.telegram),
  };
}

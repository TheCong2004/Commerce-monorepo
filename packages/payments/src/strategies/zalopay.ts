import { PaymentStrategy } from './index';
import { CreatePaymentData } from '../types';

export class ZaloPayStrategy implements PaymentStrategy {
  constructor(private config?: { appId?: string; key1?: string; key2?: string }) {}

  private getConfig() {
    return {
      appId: this.config?.appId || process.env.ZALOPAY_APP_ID,
      key1: this.config?.key1 || process.env.ZALOPAY_KEY1,
      key2: this.config?.key2 || process.env.ZALOPAY_KEY2,
    };
  }

  async createPayment(orderData: CreatePaymentData) {
    const { appId, key1 } = this.getConfig();

    if (!appId || !key1) {
      throw new Error('ZaloPay configuration missing');
    }

    const order = {
      app_id: appId,
      app_trans_id: orderData.appTransId || `${Date.now()}_${orderData.orderId}`,
      app_user: orderData.userId,
      app_time: Date.now(),
      item: JSON.stringify(orderData.items),
      embed_data: JSON.stringify({ orderId: orderData.orderId }),
      amount: orderData.amount,
      description: orderData.description,
      bank_code: "zalopayapp",
    };

    // Note: MAC calculation should be done here in a real implementation
    // const data = order.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    // order.mac = hmac_sha256(key1, data);

    // This is a mock implementation of the ZaloPay API call
    // In a real app, you would use fetch(ZALOPAY_CREATE_ORDER_URL, { method: 'POST', body: JSON.stringify(order) })
    
    console.log('ZaloPay creating order:', order);
    
    // Returning a mock zp_trans_token for demonstration
    return {
      zpTransToken: `mock_token_${Date.now()}`,
      orderId: orderData.orderId,
      ...order
    };
  }

  async verifyCallback(data: any, mac: string) {
    const { key2 } = this.getConfig();
    if (!key2) return false;
    
    // In production, verify the MAC using key2
    // const expectedMac = hmac_sha256(key2, data);
    // return expectedMac === mac;
    
    return true;
  }
}

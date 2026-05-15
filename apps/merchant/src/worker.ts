import app from './index';
import { MerchantDO } from './do';
import { type Env } from './types';

export { MerchantDO };

export default {
  fetch: (app as any).fetch,
  async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
    const id = env.MERCHANT.idFromName('default');
    const stub = env.MERCHANT.get(id);
    const cleaned = await (stub as unknown as { cleanupExpiredCarts: () => Promise<number> }).cleanupExpiredCarts();
    console.log(`Cron: cleaned ${cleaned} expired carts`);
  },
};

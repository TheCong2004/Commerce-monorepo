import { Bot, webhookCallback } from 'grammy';
import { HonoEnv } from '../types';

export const getBot = (token: string) => {
  const bot = new Bot(token);

  bot.command('start', async (ctx) => {
    await ctx.reply('Chào mừng bạn đến với Commerce Shop! 🚀', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Mở cửa hàng',
              web_app: { url: 'https://commerce-miniapp.pages.dev' }, // Placeholder
            },
          ],
        ],
      },
    });
  });

  return bot;
};

export const handleBotWebhook = async (c: any) => {
  const token = c.env.TELEGRAM_BOT_TOKEN;
  if (!token) return c.json({ ok: false, error: 'Token missing' }, 400);

  const bot = getBot(token);
  return webhookCallback(bot, 'hono')(c);
};

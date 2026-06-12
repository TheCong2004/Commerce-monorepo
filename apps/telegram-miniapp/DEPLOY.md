# Telegram Miniapp Cloudflare Deploy

Telegram miniapp deploys as a static Cloudflare Pages project.

## One-time secrets

Set secrets outside source control:

```powershell
pnpm --dir apps/telegram-miniapp exec wrangler pages secret put TELEGRAM_BOT_TOKEN --project-name=telegram-shop
pnpm --dir apps/telegram-miniapp exec wrangler pages secret put TELEGRAM_BOT_TOKEN --project-name=telegram-shop-staging
pnpm --dir apps/telegram-miniapp exec wrangler pages secret put TELEGRAM_BOT_TOKEN --project-name=telegram-shop-preview
```

If the bot token was previously stored in the repository, rotate it in BotFather before deploying.

## Deploy commands

```powershell
pnpm --dir apps/telegram-miniapp deploy:prod
pnpm --dir apps/telegram-miniapp deploy:staging
pnpm --dir apps/telegram-miniapp deploy:preview
```

Root deploy commands now include this package through Turbo because the package exposes matching `deploy:*` scripts:

```powershell
pnpm deploy:prod
pnpm deploy:staging
pnpm deploy:preview
```

The build output is `apps/telegram-miniapp/out`.

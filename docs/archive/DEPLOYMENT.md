# Basely Bot - Vercel Deployment Guide

## Quick Deploy untuk Hackathon (5 menit!)

### 1. Prerequisites
- Vercel account (gratis di vercel.com)
- Telegram bot token
- Contract addresses (StakingPool & MockETH)

### 2. Deploy Steps

#### A. Login ke Vercel
```bash
vercel login
```

#### B. Deploy Project
```bash
cd C:\Users\T470\Documents\Basely
vercel --prod
```

#### C. Set Environment Variables
Setelah deploy, set env vars di Vercel Dashboard atau via CLI:

```bash
vercel env add TELEGRAM_BOT_TOKEN
# Paste: 8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA

vercel env add STAKING_POOL_ADDRESS
# Paste: 0x814D00372212f2dfd98340e010fd74a485619fc2

vercel env add MOCK_ETH_ADDRESS
# Paste: 0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF

vercel env add WALLET_ADDRESS
# Paste: 0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF

vercel env add PRIVATE_KEY
# Paste: 0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797

vercel env add RPC_URL
# Paste: https://sepolia.base.org

vercel env add WEBHOOK_SECRET
# Generate random: openssl rand -hex 32
```

#### D. Set Telegram Webhook
Setelah deploy, get webhook URL (e.g., https://basely.vercel.app/api/bot)

```bash
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR-DEPLOYMENT-URL.vercel.app/api/bot"}'
```

### 3. Test Bot
1. Open Telegram
2. Search untuk bot Anda
3. Send `/start`
4. Bot harus merespon!

### 4. Production URLs
- **Webhook Endpoint**: `https://basely.vercel.app/api/bot`
- **Web App**: `https://basely.vercel.app`
- **Dashboard**: `https://vercel.com/dashboard`

## Troubleshooting

### Bot tidak merespon?
1. Check Vercel logs: `vercel logs`
2. Verify webhook: `curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
3. Check env vars di Vercel Dashboard

### Deployment failed?
1. Check vercel.json syntax
2. Verify api/bot.js exists
3. Run `vercel --debug` untuk detailed logs

## Notes
- Serverless function = auto-scaling!
- No server maintenance needed
- Free tier: 100GB bandwidth/month
- Perfect untuk hackathon demo!

## Contract Addresses (Base Sepolia)
- **StakingPool**: 0x814D00372212f2dfd98340e010fd74a485619fc2
- **MockETH**: 0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
- **Network**: Base Sepolia (Chain ID: 84532)
- **RPC**: https://sepolia.base.org

---
Last Updated: 2025-10-21

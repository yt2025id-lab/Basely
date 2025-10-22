# Railway Deployment Guide - Basely Bot

> Simple step-by-step guide untuk deploy Basely Telegram Bot ke Railway

## Prerequisites

- ✅ Railway account (https://railway.app)
- ✅ GitHub repo sudah di-push
- ✅ Bot token dari @BotFather
- ✅ Wallet address & private key (testnet)
- ✅ Smart contracts sudah deployed

## Step 1: Create New Project di Railway

1. Login ke https://railway.app
2. Klik **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Pilih repository **Basely**
5. Railway akan auto-detect dan mulai setup

## Step 2: Configure Environment Variables

Di Railway Dashboard → Settings → Variables, tambahkan:

```env
TELEGRAM_BOT_TOKEN=<your_bot_token_from_botfather>
WALLET_ADDRESS=<your_wallet_address>
PRIVATE_KEY=<your_private_key>
RPC_URL=https://sepolia.base.org
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0xaa742F895CE3387935DfEa7eCA8414a2426FB183
CHAIN_ID=84532
NODE_ENV=production
```

**PENTING:**
- Private key harus include prefix `0x`
- Gunakan testnet wallet, JANGAN mainnet wallet
- Check setiap value sebelum save

## Step 3: Verify Build Settings

Railway akan auto-detect `railway.json`. Pastikan:

**Build Command:** `npm install`
**Start Command:** `npm start`

File `railway.json` sudah configured:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Step 4: Deploy!

1. Klik **"Deploy"** atau Railway akan auto-deploy
2. Tunggu proses build (2-3 menit)
3. Check logs untuk memastikan bot running

## Step 5: Monitor Logs

Di Railway Dashboard → Deployments → View Logs

**Logs yang bagus:**
```
✅ Bot configuration validated
🔗 Network: Base Sepolia (Chain ID: 84532)
💼 Wallet: 0x...
📦 Staking Pool: 0x814D00372212f2dfd98340e010fd74a485619fc2
✅ Basely bot is running!
```

**Kalau ada error:**
- Check environment variables
- Verify bot token valid
- Ensure private key format correct (with 0x)
- Check RPC URL accessible

## Step 6: Test Bot

1. Buka Telegram
2. Search bot: `@BaselyCryptoBot`
3. Send command: `/start`
4. Test commands:
   - `/balance` - Check balance
   - `/mystake` - View staking info
   - `/mocketh` - Claim mockETH
   - `/stake 0.01` - Stake ETH

## Troubleshooting

### Bot tidak respond
- Check Railway logs untuk errors
- Verify bot masih running (status: Active)
- Restart deployment kalau perlu

### Configuration errors
```bash
# Check logs untuk "Configuration validation failed"
# Biasanya karena missing env vars
```

### Contract errors
```bash
# Check contract addresses di BaseScan
# Verify RPC URL working
```

## Useful Commands

**Restart bot:**
```bash
Railway Dashboard → Deployments → Restart
```

**View real-time logs:**
```bash
Railway Dashboard → Deployments → View Logs
```

**Update env variables:**
```bash
Railway Dashboard → Variables → Edit
# Note: Otomatis trigger redeploy
```

## Post-Deployment Checklist

- [ ] Bot responding di Telegram
- [ ] `/start` command works
- [ ] `/balance` shows correct balances
- [ ] `/mystake` shows staking info
- [ ] Contract links ke BaseScan working
- [ ] No errors dalam logs

## Need Help?

- Railway Docs: https://docs.railway.app
- Check logs first for error messages
- Verify all env vars correct
- Test commands satu per satu

---

**Bot Status URL:**
Setelah deploy, bot akan always-on di Railway. Tidak perlu laptop running!

**Estimated Deploy Time:** 5-10 minutes total

**Cost:** FREE (Railway free tier cukup untuk MVP)

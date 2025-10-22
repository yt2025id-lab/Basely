# ⚡ QUICK DEPLOY - 5 MENIT!

## Option 1: Automated (Windows)
```batch
deploy-vercel.bat
```

## Option 2: Manual Steps

### 1. Login
```bash
vercel login
```

### 2. Deploy
```bash
vercel --prod
```

### 3. Set Env Vars
Go to: https://vercel.com/dashboard → Project → Settings → Environment Variables

Add 6 variables:
- `TELEGRAM_BOT_TOKEN`: `8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA`
- `STAKING_POOL_ADDRESS`: `0x814D00372212f2dfd98340e010fd74a485619fc2`
- `MOCK_ETH_ADDRESS`: `0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF`
- `WALLET_ADDRESS`: `0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF`
- `PRIVATE_KEY`: `0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797`
- `RPC_URL`: `https://sepolia.base.org`

### 4. Redeploy
```bash
vercel --prod
```

### 5. Set Webhook (PowerShell)
```powershell
.\set-webhook.ps1 -DeploymentUrl "https://YOUR-URL.vercel.app"
```

### 6. Test
Open Telegram → Send `/start` to your bot!

---

## Verify

### Check Webhook
```bash
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo
```

### Check Logs
```bash
vercel logs --follow
```

---

## Troubleshooting

### Bot tidak merespon?
1. Check env vars di Vercel Dashboard
2. Redeploy: `vercel --prod --force`
3. Reset webhook dengan script PowerShell

### Deployment failed?
1. Run: `vercel --debug`
2. Check file structure (api/bot.js exists?)
3. Verify vercel.json syntax

---

## Files Created

✅ Core Files:
- `api/bot.js` - Serverless function
- `vercel.json` - Deployment config
- `.vercelignore` - File exclusions

✅ Documentation:
- `DEPLOY_TO_VERCEL.md` - Full guide
- `DEPLOYMENT.md` - Detailed instructions
- `QUICK_DEPLOY.md` - This file

✅ Scripts:
- `deploy-vercel.bat` - Windows deployment
- `deploy-vercel.sh` - Linux/Mac deployment
- `set-webhook.ps1` - PowerShell webhook setup

---

## Contract Info

**Base Sepolia Testnet**
- Chain ID: 84532
- RPC: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

**StakingPool**: [0x814D00372212f2dfd98340e010fd74a485619fc2](https://sepolia.basescan.org/address/0x814D00372212f2dfd98340e010fd74a485619fc2)
**MockETH**: [0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF](https://sepolia.basescan.org/address/0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF)

---

## 🎯 HACKATHON READY!

**Total Time**: ~5 minutes
**Status**: Production Ready ✅

For detailed guide: [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md)

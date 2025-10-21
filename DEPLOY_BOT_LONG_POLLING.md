# 🤖 Deploy Basely Bot - Long Polling Mode (Hackathon Ready!)

Bot sudah dikonfigurasi untuk menggunakan **Long Polling** - tidak perlu webhook, lebih mudah untuk hackathon!

---

## 🚀 Quick Start - Run Locally (1 Menit)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Environment Variables
Pastikan file `.env` ada di root project dengan isi:
```env
TELEGRAM_BOT_TOKEN=8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA
WALLET_ADDRESS=0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF
PRIVATE_KEY=0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797
RPC_URL=https://sepolia.base.org
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
```

### Step 3: Run Bot
```bash
npm start
```

Bot akan jalan di terminal dan siap menerima pesan di Telegram! ✅

**Test Bot:**
1. Buka Telegram
2. Cari bot: `@basely_bot` (atau nama bot kamu)
3. Kirim `/start`
4. Bot akan merespon!

---

## ☁️ Deploy ke Cloud (Gratis untuk Hackathon!)

### Option 1: Railway.app (RECOMMENDED - Paling Mudah)

**Railway** menyediakan $5 free credit dan sangat mudah untuk deploy!

#### Step-by-Step Railway Deployment:

**1. Persiapan GitHub**
```bash
# Pastikan semua file sudah di-commit
git add .
git commit -m "feat: add long polling bot deployment"
git push origin main
```

**2. Deploy ke Railway**
1. Buka https://railway.app
2. Login dengan GitHub
3. Klik **"New Project"**
4. Pilih **"Deploy from GitHub repo"**
5. Pilih repository: `yt2025id-lab/Basely`
6. Railway akan auto-detect Node.js

**3. Configure Environment Variables**
Di Railway Dashboard → Variables:
```
TELEGRAM_BOT_TOKEN=8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA
WALLET_ADDRESS=0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF
PRIVATE_KEY=0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797
RPC_URL=https://sepolia.base.org
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
```

**4. Configure Start Command**
Di Railway Dashboard → Settings → Deploy:
- **Start Command**: `npm start`
- **Build Command**: (leave empty)

**5. Deploy!**
Klik **"Deploy"** dan tunggu ~1-2 menit.

**6. Verify Bot Running**
- Cek Logs di Railway Dashboard
- Test bot di Telegram dengan `/start`

✅ **DONE! Bot jalan 24/7 gratis!**

---

### Option 2: Render.com (Alternative - Also Free)

**Render** juga menyediakan free tier untuk bot.

#### Step-by-Step Render Deployment:

**1. Create New Web Service**
1. Buka https://render.com
2. Login dengan GitHub
3. Klik **"New +"** → **"Web Service"**
4. Connect repository: `yt2025id-lab/Basely`

**2. Configure Service**
```
Name: basely-bot
Environment: Node
Region: Singapore (terdekat)
Branch: main
Build Command: npm install
Start Command: npm start
```

**3. Set Environment Variables**
Tambahkan semua env vars seperti di Railway (lihat di atas)

**4. Choose Free Plan**
- Instance Type: **Free** (512MB RAM)
- Auto-Deploy: **Yes**

**5. Deploy**
Klik **"Create Web Service"** dan tunggu deployment selesai.

✅ **Bot ready!**

---

### Option 3: Fly.io (Advanced - More Control)

**Fly.io** memberikan free tier yang generous.

#### Quick Deploy with Fly:

**1. Install Fly CLI**
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Linux/Mac
curl -L https://fly.io/install.sh | sh
```

**2. Login**
```bash
fly auth login
```

**3. Create fly.toml**
File sudah disediakan di project (lihat `fly.toml` di root)

**4. Deploy**
```bash
fly launch
fly secrets set TELEGRAM_BOT_TOKEN=8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA
fly secrets set WALLET_ADDRESS=0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF
fly secrets set PRIVATE_KEY=0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797
fly secrets set RPC_URL=https://sepolia.base.org
fly secrets set STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
fly secrets set MOCK_ETH_ADDRESS=0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
fly deploy
```

**5. Monitor**
```bash
fly logs
```

---

## 🆚 Comparison - Which Platform?

| Platform | Free Tier | Ease | Best For |
|----------|-----------|------|----------|
| **Railway** | $5 credit/month | ⭐⭐⭐⭐⭐ Easiest | **HACKATHON (Recommended!)** |
| **Render** | 750 hours/month | ⭐⭐⭐⭐ Easy | Long-term free hosting |
| **Fly.io** | 3 VMs free | ⭐⭐⭐ Medium | More control needed |
| **Vercel** | Unlimited | ⭐⭐ Complex | Webhook only (not polling) |

**For Hackathon → Use Railway!** ✅

---

## 🔧 Troubleshooting

### Bot tidak merespon?

**1. Check bot is running:**
```bash
# Lokal
npm start

# Railway/Render
Check Logs in dashboard
```

**2. Check environment variables:**
```bash
# Lokal
cat .env

# Railway/Render
Check Variables tab in dashboard
```

**3. Check Telegram bot token:**
```bash
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getMe
```

Should return bot info.

**4. Delete webhook (if exists):**
```bash
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook
```

Long polling won't work if webhook is set!

### Error: "409 Conflict: terminated by other getUpdates"

Another instance of bot is running! Stop all other instances:
- Close local `npm start`
- Stop Railway deployment
- Delete webhook

Only run ONE instance at a time!

### Error: Missing environment variables

Check `.env` file or cloud platform environment variables section.

---

## 📊 Bot Health Check

### Check Bot Status:
```bash
# Get bot info
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getMe

# Get webhook info (should be empty for polling)
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo
```

Expected for long polling:
```json
{
  "ok": true,
  "result": {
    "url": "",  // Empty = using polling ✅
    "pending_update_count": 0
  }
}
```

---

## 🎯 Hackathon Demo Checklist

- [ ] Bot deployed ke Railway/Render
- [ ] Environment variables configured
- [ ] Bot merespon `/start`
- [ ] Test semua commands:
  - [ ] `/balance` - Check balance
  - [ ] `/mocketh` - Claim free tokens
  - [ ] `/stake 0.01` - Stake ETH
  - [ ] `/mystake` - View stake info
  - [ ] `/claim` - Claim rewards
  - [ ] `/unstake` - Unstake
- [ ] Prepare backup jika deployment down:
  - [ ] Screenshots of working bot
  - [ ] Video demo
  - [ ] Run `npm start` lokal sebagai fallback

---

## 💡 Pro Tips

### 1. Keep Bot Running 24/7
Railway/Render free tier akan mematikan bot jika idle. Solusi:
- Upgrade ke paid plan ($5-7/month)
- Atau gunakan cron job untuk ping bot

### 2. Monitor Logs
```bash
# Railway
Railway dashboard → Deployments → View Logs

# Render
Render dashboard → Logs tab

# Local
npm start (lihat di terminal)
```

### 3. Quick Restart
Jika bot stuck, restart deployment di Railway/Render dashboard.

### 4. Multiple Environments
- **Development**: Run lokal dengan `npm start`
- **Production**: Railway/Render auto-deploy from `main` branch

---

## 🚀 Deploy Commands Summary

### Railway (Recommended):
```bash
git push origin main
# Then deploy via Railway dashboard
```

### Render:
```bash
git push origin main
# Auto-deploys if connected to GitHub
```

### Fly.io:
```bash
fly deploy
```

### Local Testing:
```bash
npm start
```

---

## 📞 Support

Jika ada masalah:
1. Check logs (Railway/Render dashboard)
2. Verify environment variables
3. Test locally dengan `npm start`
4. Delete webhook: `curl ...deleteWebhook` (lihat di atas)

---

## 🎉 READY FOR HACKATHON!

**Estimated Setup Time**: 5-10 minutes
**Difficulty**: Easy ⭐⭐
**Status**: Production Ready ✅

**GOOD LUCK!** 🚀

---

Last Updated: 2025-10-22
Mode: Long Polling (No Webhook Required)

# ⚡ QUICKSTART - Basely Bot (Long Polling)

**Cara tercepat untuk deploy bot hackathon dalam 5 menit!**

---

## 🚀 Local Testing (30 detik)

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Pastikan .env file ada dan sudah diisi
cat .env

# 3. Run bot!
npm start
```

✅ Bot jalan! Test di Telegram dengan `/start`

---

## ☁️ Deploy ke Railway (5 menit) - RECOMMENDED!

### Step 1: Push ke GitHub
```bash
git add .
git commit -m "feat: add long polling bot deployment"
git push origin main
```

### Step 2: Deploy di Railway
1. Buka https://railway.app
2. Login dengan GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Pilih: `yt2025id-lab/Basely`

### Step 3: Set Environment Variables
Di Railway → Variables → Add these:
```
TELEGRAM_BOT_TOKEN=8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA
WALLET_ADDRESS=0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF
PRIVATE_KEY=0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797
RPC_URL=https://sepolia.base.org
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
```

### Step 4: Configure Start Command
Settings → Deploy:
- **Start Command**: `npm start`

### Step 5: Deploy!
Klik **Deploy** → Tunggu 1-2 menit

✅ **DONE! Bot live 24/7!**

---

## 🧪 Test Bot

Di Telegram, kirim:
- `/start` - Welcome message
- `/help` - Show commands
- `/balance` - Check balance
- `/mocketh` - Claim 10 free mockETH
- `/stake 0.01` - Stake ETH
- `/mystake` - View stake info
- `/claim` - Claim rewards

---

## 🐛 Troubleshooting

### Bot tidak merespon?

**Delete webhook dulu:**
```bash
curl https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook
```

**Restart bot:**
- Railway: Dashboard → Restart
- Local: Stop (`Ctrl+C`) dan run `npm start` lagi

### Error "409 Conflict"?
Matikan semua instance bot yang lain! Hanya boleh 1 instance jalan.

---

## 📚 Full Documentation

Baca guide lengkap di: [DEPLOY_BOT_LONG_POLLING.md](DEPLOY_BOT_LONG_POLLING.md)

---

**SIAP UNTUK HACKATHON!** 🎉

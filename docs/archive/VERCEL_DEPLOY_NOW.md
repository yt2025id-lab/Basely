# 🚀 DEPLOY TO VERCEL NOW - Step by Step

## Current Status

❌ **Error**: `DEPLOYMENT_NOT_FOUND` at `https://basely-xyz.vercel.app`
✅ **Fix**: Project belum di-deploy, mari deploy sekarang!

---

## 📦 Files Ready

✅ `api/bot.js` - Serverless function (webhook handler)
✅ `vercel.json` - Updated configuration (modern format)
✅ `.vercelignore` - Optimized exclusions
✅ `package.json` - Dependencies configured

---

## 🎯 DEPLOY SEKARANG - 3 Steps

### Step 1: Login ke Vercel

```bash
vercel login
```

**What happens:**
- Browser akan terbuka
- Login dengan **GitHub**, **GitLab**, atau **Email**
- Kembali ke terminal setelah success

### Step 2: Deploy to Production

```bash
cd C:\Users\T470\Documents\Basely
vercel --prod
```

**Jawab pertanyaan:**

1. **Set up and deploy "C:\Users\T470\Documents\Basely"?**
   → `Y` (Yes)

2. **Which scope do you want to deploy to?**
   → Pilih account Anda (biasanya username Anda)

3. **Link to existing project?**
   → `N` (No - buat project baru)

4. **What's your project's name?**
   → `basely` (atau nama lain yang Anda mau)

5. **In which directory is your code located?**
   → `.` (dot - current directory) atau tekan Enter

6. **Want to override the settings?**
   → `N` (No - use defaults)

**Deployment akan berjalan ~2-3 menit**

### Step 3: Copy Deployment URL

Setelah selesai, Anda akan dapat output seperti:

```
✅ Production: https://basely-abc123.vercel.app [2s]
```

**COPY URL INI!** Ini adalah deployment URL Anda.

---

## 🔐 Step 4: Set Environment Variables

### Via Vercel Dashboard (REQUIRED!)

1. Buka https://vercel.com/dashboard
2. Click project "basely" (atau nama yang Anda gunakan)
3. Click tab **Settings**
4. Click **Environment Variables** di sidebar
5. Add 6 variables berikut:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `TELEGRAM_BOT_TOKEN` | `8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA` | Production |
| `STAKING_POOL_ADDRESS` | `0x814D00372212f2dfd98340e010fd74a485619fc2` | Production |
| `MOCK_ETH_ADDRESS` | `0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF` | Production |
| `WALLET_ADDRESS` | `0xFC5b69C08a5fA6c5c3D1f6e9624c2746CE4D41cF` | Production |
| `PRIVATE_KEY` | `0x8adbf692b09754b988de2fc1bd0bd496405e7fe3f3f1b417faa97d1239b4a797` | Production |
| `RPC_URL` | `https://sepolia.base.org` | Production |

**Cara add variable:**
- Click "Add New"
- Name: paste variable name
- Value: paste value dari table
- Environment: select "Production"
- Click "Save"

**Repeat 6 kali untuk semua variables!**

---

## 🔄 Step 5: Redeploy (IMPORTANT!)

Setelah add environment variables, HARUS redeploy:

```bash
vercel --prod
```

Atau di Vercel Dashboard:
- Go to Deployments tab
- Click "Redeploy" pada latest deployment

**Environment variables hanya loaded saat deployment!**

---

## 🔗 Step 6: Set Telegram Webhook

Setelah redeploy selesai, set webhook:

### PowerShell (Windows):

```powershell
.\setup-webhook-quick.ps1 -DeploymentUrl "https://YOUR-ACTUAL-URL.vercel.app"
```

Ganti `YOUR-ACTUAL-URL.vercel.app` dengan URL dari Step 3!

### Bash (Linux/Mac):

```bash
./set-webhook.sh https://YOUR-ACTUAL-URL.vercel.app
```

### Manual (curl):

```bash
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR-ACTUAL-URL.vercel.app/api/bot", "drop_pending_updates": true}'
```

**Expected Response:**
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

---

## ✅ Step 7: Test Bot!

1. Open **Telegram**
2. Search your bot
3. Send: `/start`

Bot should respond instantly! 🎉

---

## 🐛 Troubleshooting

### "TELEGRAM_BOT_TOKEN is required"

**Fix:** Environment variables belum di-set atau belum redeploy
- Check Vercel Dashboard → Settings → Environment Variables
- Ensure all 6 variables exist
- Redeploy: `vercel --prod`

### "Cannot find module 'telegraf'"

**Fix:** Dependencies tidak ter-install
- Check `package.json` has `telegraf` in dependencies
- Redeploy: `vercel --prod --force`

### Webhook Error "Wrong response from webhook: 500"

**Fix:** Check Vercel function logs
```bash
vercel logs --follow
```

Look for error details dan fix accordingly.

### Bot tidak merespon

**Fix:**
1. Check webhook status:
```bash
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

2. Verify URL matches deployment
3. Check Vercel logs for errors
4. Reset webhook dengan script

---

## 📊 Verify Deployment

### Check Deployment Status

```bash
vercel ls
```

Should show:
- Project name: `basely`
- Status: **Ready** ✅
- URL: Your deployment URL

### Check Environment Variables

Go to: Vercel Dashboard → Project → Settings → Environment Variables

Should see **6 variables** listed.

### Check Webhook

```bash
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

Should show:
```json
{
  "url": "https://your-url.vercel.app/api/bot",
  "pending_update_count": 0
}
```

### Check Logs

```bash
vercel logs --follow
```

Should show incoming webhook requests when you message bot.

---

## 🎯 Quick Command Summary

```bash
# 1. Login
vercel login

# 2. Deploy
cd C:\Users\T470\Documents\Basely
vercel --prod

# 3. Set env vars in dashboard
# https://vercel.com/dashboard → Project → Settings → Environment Variables

# 4. Redeploy
vercel --prod

# 5. Set webhook (replace URL!)
.\setup-webhook-quick.ps1 -DeploymentUrl "https://YOUR-URL.vercel.app"

# 6. Test
# Open Telegram, send /start

# 7. Monitor
vercel logs --follow
```

---

## 💡 Pro Tips

### Tip 1: Save Your Deployment URL

Create `.env.production` file:
```bash
VERCEL_URL=https://your-actual-url.vercel.app
```

### Tip 2: Use Vercel CLI Aliases

```bash
# Set production alias
vercel alias set https://basely-abc123.vercel.app basely.vercel.app
```

### Tip 3: Enable GitHub Integration

Connect Vercel to your GitHub repo for auto-deploy on push!

---

## 🏆 Success Indicators

Deployment berhasil jika:

1. ✅ `vercel ls` shows Status = Ready
2. ✅ Environment variables all set (6 variables)
3. ✅ Webhook URL configured correctly
4. ✅ Bot responds to `/start` in < 1 second
5. ✅ Vercel logs show incoming webhooks
6. ✅ No errors in function logs

---

## 📞 Need Help?

**Check Logs:**
```bash
vercel logs --follow
```

**Check Webhook:**
```bash
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

**Reset Everything:**
```bash
# Delete webhook
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook"

# Redeploy
vercel --prod --force

# Set webhook again
.\setup-webhook-quick.ps1 -DeploymentUrl "https://YOUR-URL.vercel.app"
```

---

## 🚀 READY TO DEPLOY!

**Estimated Time:** 10-15 minutes
**Difficulty:** Easy (step-by-step guide)

### Start Now:

```bash
vercel login
```

Then follow steps above!

**GOOD LUCK!** 🎉

---

Last Updated: 2025-10-21
Status: Ready to Deploy ✅

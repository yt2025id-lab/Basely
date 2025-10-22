# 🔗 WEBHOOK SETUP GUIDE - Basely Telegram Bot

## Quick Reference - Get Bot Live in 10 Minutes!

Setelah deploy ke Vercel, ikuti panduan ini untuk setup webhook dan activate bot di Telegram.

---

## 📋 Prerequisites

✅ Bot sudah di-deploy ke Vercel
✅ Vercel deployment URL sudah didapat (e.g., `https://basely-xyz.vercel.app`)
✅ Environment variables sudah di-set di Vercel Dashboard
✅ Deployment status = **Ready**

---

## 🚀 Quick Setup - 3 Methods

### Method 1: PowerShell Script (Windows - RECOMMENDED)

```powershell
# Run script dengan deployment URL
.\setup-webhook-quick.ps1 -DeploymentUrl "https://basely-xyz.vercel.app"

# Or run tanpa parameter (akan diminta input URL)
.\setup-webhook-quick.ps1
```

**Features:**
- ✅ Auto-delete old webhook
- ✅ Set new webhook
- ✅ Verify configuration
- ✅ Test endpoint accessibility
- ✅ Display comprehensive status

### Method 2: Bash Script (Linux/Mac/Git Bash)

```bash
# Make executable
chmod +x set-webhook.sh

# Run dengan URL
./set-webhook.sh https://basely-xyz.vercel.app
```

### Method 3: Manual cURL Commands

**Step 1: Delete old webhook (optional)**
```bash
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook"
```

**Step 2: Set new webhook**
```bash
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR-DEPLOYMENT-URL.vercel.app/api/bot", "drop_pending_updates": true}'
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

## ✅ Verify Webhook Status

### Check dengan Script

```bash
# Bash
./check-webhook-status.sh

# PowerShell (included in setup-webhook-quick.ps1)
```

### Check Manual

```bash
curl -s "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

**Healthy Webhook Response:**
```json
{
  "ok": true,
  "result": {
    "url": "https://basely-xyz.vercel.app/api/bot",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "max_connections": 40,
    "ip_address": "76.76.21.21"
  }
}
```

**Key Fields:**
- `url`: Should match your deployment URL + `/api/bot`
- `pending_update_count`: Should be 0 (or low number)
- `last_error_date`: Should NOT exist (if exists, ada problem)

---

## 🧪 Test Bot

### Step 1: Open Telegram

1. Open Telegram app (mobile or desktop)
2. Search for your bot username
3. Start conversation

### Step 2: Send Test Commands

```
/start
```

**Expected Response:**
```
🎉 Welcome to Basely - AI-Powered DeFi Assistant!

I can help you with:
💰 Check Balance - View your ETH and mockETH balance
🔒 Stake ETH - Earn mockETH rewards (1% per day)
...
```

### Step 3: Test Other Commands

```
/help
/balance
/mocketh
```

If bot responds instantly → **SUCCESS!** ✅

If bot doesn't respond → See troubleshooting below

---

## 🐛 Troubleshooting

### Bot Tidak Merespon?

#### Check 1: Verify Webhook URL
```bash
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

Pastikan `url` field tidak kosong dan benar.

#### Check 2: Test Endpoint Accessibility
```bash
curl -X GET "https://your-deployment.vercel.app/api/bot"
```

**Expected:**
- HTTP 405 (Method Not Allowed) - OK! Endpoint exists tapi hanya accept POST
- HTTP 200 - OK!
- HTTP 404 - ERROR! File api/bot.js tidak ditemukan
- Timeout - ERROR! Deployment tidak accessible

#### Check 3: Vercel Logs
```bash
vercel logs --follow
```

Look for:
- Errors saat receive webhook
- Missing environment variables
- Function timeout errors

#### Check 4: Environment Variables
Go to Vercel Dashboard → Project → Settings → Environment Variables

Ensure these 6 variables exist:
- `TELEGRAM_BOT_TOKEN`
- `STAKING_POOL_ADDRESS`
- `MOCK_ETH_ADDRESS`
- `WALLET_ADDRESS`
- `PRIVATE_KEY`
- `RPC_URL`

If missing, add them and **REDEPLOY**: `vercel --prod`

#### Check 5: Webhook Error Message
```bash
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
```

Check for `last_error_message` field:

**Common Errors:**

1. **"Wrong response from the webhook: 500 Internal Server Error"**
   - Check Vercel logs for error details
   - Verify env vars are set
   - Check code syntax in api/bot.js

2. **"Connection timed out"**
   - Vercel function might be cold starting (try again)
   - Check function timeout settings
   - Verify deployment region

3. **"SSL certificate verify failed"**
   - Vercel uses valid SSL, shouldn't happen
   - Try re-setting webhook

### Reset Webhook

If problems persist, reset webhook completely:

**PowerShell:**
```powershell
# Delete webhook
Invoke-RestMethod -Uri "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook" -Method Post

# Wait 5 seconds
Start-Sleep -Seconds 5

# Re-run setup script
.\setup-webhook-quick.ps1 -DeploymentUrl "https://your-url.vercel.app"
```

**Bash:**
```bash
# Delete webhook
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook"

# Wait 5 seconds
sleep 5

# Re-run setup script
./set-webhook.sh https://your-url.vercel.app
```

### Switch Back to Polling (Local Development)

If you want to test bot locally while webhook is active, you MUST delete webhook first:

```bash
# Delete webhook
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook"

# Verify deleted
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"
# Should show: "url": ""

# Now run local bot
npm run bot
```

**IMPORTANT:** Telegram bot can only use ONE mode at a time:
- Webhook OR Polling
- NOT both simultaneously

---

## 📊 Webhook vs Polling

| Feature | Webhook (Production) | Polling (Development) |
|---------|---------------------|----------------------|
| **Speed** | Instant (< 1 second) | Delayed (1-3 seconds) |
| **Server Load** | Low (event-driven) | High (constant requests) |
| **Scalability** | Excellent | Poor |
| **Local Dev** | ❌ Requires public URL | ✅ Works locally |
| **Cost** | Free on Vercel | Free |
| **Best For** | Production deployment | Local testing |

**Recommendation:**
- 🏭 **Production**: Use webhook on Vercel
- 💻 **Development**: Use polling locally

---

## 🔄 Deployment Workflow

### Complete Flow untuk Production

```bash
# 1. Deploy to Vercel
vercel --prod

# 2. Copy deployment URL from output
# Example: https://basely-xyz.vercel.app

# 3. Set environment variables in Vercel Dashboard
# (if not already set)

# 4. Redeploy to load env vars
vercel --prod

# 5. Set webhook
.\setup-webhook-quick.ps1 -DeploymentUrl "https://basely-xyz.vercel.app"

# 6. Test bot on Telegram
# Send /start to your bot

# 7. Monitor logs
vercel logs --follow
```

---

## 📝 Webhook URL Format

**Correct Format:**
```
https://YOUR-DEPLOYMENT-URL.vercel.app/api/bot
```

**Examples:**
- ✅ `https://basely.vercel.app/api/bot`
- ✅ `https://basely-xyz.vercel.app/api/bot`
- ✅ `https://my-awesome-bot.vercel.app/api/bot`

**Common Mistakes:**
- ❌ `http://basely.vercel.app/api/bot` (HTTP instead of HTTPS)
- ❌ `https://basely.vercel.app/bot` (missing `/api/`)
- ❌ `https://basely.vercel.app/api/bot/` (trailing slash)

---

## 🎯 Success Checklist

After setup, verify:

- [ ] ✅ Webhook info shows correct URL
- [ ] ✅ `pending_update_count` is 0 or low
- [ ] ✅ No `last_error_message` field
- [ ] ✅ Bot responds to `/start` instantly
- [ ] ✅ All commands working
- [ ] ✅ Vercel logs show no errors
- [ ] ✅ Deployment status = Ready

---

## 📚 Scripts Reference

| Script | Platform | Purpose |
|--------|----------|---------|
| `setup-webhook-quick.ps1` | Windows PowerShell | Complete webhook setup with verification |
| `set-webhook.sh` | Linux/Mac/Bash | Set webhook URL |
| `check-webhook-status.sh` | Linux/Mac/Bash | Check current webhook status |
| `set-webhook.ps1` | PowerShell | Alternative webhook setter |

**All scripts located in project root.**

---

## 🔗 Useful Links

### Telegram Bot API
- **Set Webhook**: `https://api.telegram.org/bot<TOKEN>/setWebhook`
- **Get Webhook Info**: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
- **Delete Webhook**: `https://api.telegram.org/bot<TOKEN>/deleteWebhook`

### Vercel
- **Dashboard**: https://vercel.com/dashboard
- **Logs**: `vercel logs` or Dashboard → Logs tab
- **Env Vars**: Dashboard → Settings → Environment Variables

### Documentation
- Telegram Webhook Guide: https://core.telegram.org/bots/webhooks
- Vercel Serverless Functions: https://vercel.com/docs/functions
- Telegraf Docs: https://telegraf.js.org

---

## 💡 Pro Tips

### Tip 1: Use Secret Token (Optional but Recommended)

Add webhook secret for extra security:

```bash
# Generate secret
openssl rand -hex 32

# Set in Vercel as WEBHOOK_SECRET env var

# Set webhook with secret
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-url.vercel.app/api/bot", "secret_token": "YOUR_SECRET_HERE"}'
```

### Tip 2: Monitor Vercel Logs

Keep logs open during testing:
```bash
vercel logs --follow
```

### Tip 3: Test Locally First

Before production:
1. Test all features locally with `npm run bot`
2. Verify no errors
3. Then deploy to Vercel
4. Set webhook

### Tip 4: Use Different Bots for Dev/Prod

Create 2 bots with BotFather:
- `@BaselyDevBot` - for development (polling)
- `@BaselyBot` - for production (webhook)

---

## 🏆 Quick Commands Cheat Sheet

```bash
# Check webhook status
curl "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/getWebhookInfo"

# Delete webhook
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/deleteWebhook"

# Set webhook (replace URL)
curl -X POST "https://api.telegram.org/bot8012364591:AAEwEeVC5_fA1twlQkTlnw6isH4EYQMmShA/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR-URL.vercel.app/api/bot"}'

# Check Vercel logs
vercel logs --follow

# Redeploy
vercel --prod --force

# Test endpoint
curl https://YOUR-URL.vercel.app/api/bot
```

---

## 🎉 READY TO GO LIVE!

**Total Setup Time:** ~10 minutes
**Difficulty:** Easy
**Success Rate:** 99% (if env vars set correctly)

### Final Step:
```powershell
.\setup-webhook-quick.ps1 -DeploymentUrl "https://your-vercel-url.vercel.app"
```

Then open Telegram and send `/start` to your bot!

---

**Last Updated:** 2025-10-21
**Version:** 1.0.0
**Status:** Production Ready ✅

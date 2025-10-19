# 🚀 Panduan Cepat Basely (Bahasa Indonesia)

> **Basely** - Asisten DeFi berbasis AI di Telegram untuk Base Blockchain

---

## 📋 Daftar Isi

1. [Persiapan](#1-persiapan)
2. [Buat Bot Telegram](#2-buat-bot-telegram)
3. [Dapatkan Testnet ETH](#3-dapatkan-testnet-eth)
4. [Setup Wallet](#4-setup-wallet)
5. [Deploy Smart Contract](#5-deploy-smart-contract)
6. [Konfigurasi Bot](#6-konfigurasi-bot)
7. [Jalankan Bot](#7-jalankan-bot)
8. [Troubleshooting](#troubleshooting)

---

## 1. Persiapan

### Yang Dibutuhkan:
- ✅ Akun Telegram
- ✅ MetaMask wallet (untuk Base Sepolia testnet)
- ✅ Node.js 18+ dan npm
- ✅ Git (sudah terinstall)

### Install Dependencies:

```bash
cd "c:\Users\T470\Documents\Basely"
npm install
```

---

## 2. Buat Bot Telegram

### Step-by-Step:

**2.1. Buka Telegram**
- Search: `@BotFather`
- Klik START

**2.2. Buat Bot Baru**
```
Ketik: /newbot

BotFather akan bertanya:
```

**Nama Bot:**
```
Basely DeFi Assistant
```
(Atau nama lain yang Anda mau)

**Username Bot (harus unik):**
```
BaselyDeFiBot
```
(Kalau sudah dipakai, coba nama lain seperti: `BaselyDefi2024Bot`)

**2.3. Simpan Token**

BotFather akan kasih token seperti ini:
```
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
```

**PENTING**: Simpan token ini! Kita pakai nanti.

**2.4. Konfigurasi Bot (Opsional)**

```bash
# Set deskripsi
/setdescription
→ Pilih bot Anda
→ Ketik: AI-powered DeFi assistant on Base. Stake, swap & farm with simple chat commands!

# Set commands
/setcommands
→ Pilih bot Anda
→ Copy & paste ini:

start - Mulai bot
help - Lihat semua perintah
balance - Cek saldo ETH
stake - Stake ETH untuk rewards
unstake - Unstake ETH Anda
rewards - Cek rewards staking
```

---

## 3. Dapatkan Testnet ETH

### Kenapa Perlu Testnet ETH?
- Deploy smart contract perlu gas fee
- Testing bot perlu ETH
- **GRATIS** - ini testnet, bukan uang asli!

### Cara Dapat:

**3.1. Install MetaMask**
- Download: https://metamask.io/
- Buat wallet baru (atau pakai yang ada)

**3.2. Tambah Base Sepolia Network**

Manual Add Network di MetaMask:
```
Network Name: Base Sepolia
RPC URL: https://sepolia.base.org
Chain ID: 84532
Currency Symbol: ETH
Block Explorer: https://sepolia.basescan.org/
```

**3.3. Request Testnet ETH**

**Option 1 - Coinbase Faucet:**
1. Buka: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
2. Connect wallet MetaMask
3. Klik "Send me ETH"
4. Tunggu 1-2 menit

**Option 2 - Alchemy Faucet:**
1. Buka: https://www.alchemy.com/faucets/base-sepolia
2. Login dengan akun Alchemy (gratis)
3. Masukkan address wallet
4. Request 0.5 ETH

**Option 3 - QuickNode Faucet:**
1. Buka: https://faucet.quicknode.com/base/sepolia
2. Masukkan wallet address
3. Request ETH

---

## 4. Setup Wallet

### 4.1. Export Private Key (TESTNET ONLY!)

⚠️ **PENTING**: Pakai wallet khusus testnet! JANGAN pakai wallet yang ada uang aslinya!

**Cara Export dari MetaMask:**
1. Buka MetaMask
2. Klik 3 titik di pojok kanan
3. Account Details
4. Export Private Key
5. Masukkan password MetaMask
6. Copy private key (dimulai dengan `0x`)

**4.2. Simpan Wallet Info**

Copy dan simpan:
- Private Key: `0x...`
- Wallet Address: `0x...`

---

## 5. Deploy Smart Contract

Ada 2 cara: **Remix IDE** (mudah) atau **Hardhat** (advanced).

### Option A: Remix IDE (RECOMMENDED)

**5.1. Buka Remix**
```
https://remix.ethereum.org/
```

**5.2. Buat File Baru**
1. Klik icon "File" di kiri
2. Klik "+" untuk new file
3. Nama: `StakingPool.sol`

**5.3. Copy Contract**
1. Buka file lokal Anda: `c:\Users\T470\Documents\Basely\contracts\StakingPool.sol`
2. Copy semua isinya
3. Paste ke Remix

**5.4. Compile**
1. Klik tab "Solidity Compiler" (icon S di kiri)
2. Pilih version: `0.8.20` atau lebih tinggi
3. Klik "Compile StakingPool.sol"
4. Tunggu sampai muncul checkmark hijau ✅

**5.5. Deploy**
1. Klik tab "Deploy & Run Transactions" (icon Ethereum di kiri)
2. **ENVIRONMENT**: Pilih `Injected Provider - MetaMask`
3. MetaMask akan popup → Connect
4. Pastikan network di MetaMask adalah **Base Sepolia**
5. Klik tombol orange "Deploy"
6. MetaMask popup → Confirm transaksi
7. Tunggu 10-30 detik

**5.6. Copy Contract Address**
1. Setelah deploy sukses, lihat di bagian "Deployed Contracts"
2. Click untuk expand contract
3. Copy address (misalnya: `0x1234567890abcdef...`)

**5.7. Fund Contract dengan Rewards**
1. Buka MetaMask
2. Send → Paste contract address
3. Amount: `0.1 ETH`
4. Confirm

Contract siap! ✅

---

## 6. Konfigurasi Bot

### 6.1. Jalankan Setup Wizard

```bash
cd "c:\Users\T470\Documents\Basely"
npx tsx scripts/setup.ts
```

Wizard akan cek konfigurasi Anda.

### 6.2. Edit .env File

```bash
# Buka file .env dengan notepad
notepad .env
```

**Isi dengan data Anda:**

```env
# ==================================
# TELEGRAM BOT
# ==================================
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890

# ==================================
# BASE SEPOLIA
# ==================================
BASE_RPC_URL=https://sepolia.base.org
CHAIN_ID=84532

# ==================================
# WALLET (TESTNET ONLY!)
# ==================================
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
WALLET_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE

# ==================================
# SMART CONTRACT
# ==================================
STAKING_POOL_ADDRESS=0xYOUR_DEPLOYED_CONTRACT_ADDRESS

# ==================================
# WETH & TOKENS
# ==================================
WETH_ADDRESS=0x4200000000000000000000000000000000000006

# ==================================
# AI (OPSIONAL)
# ==================================
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# ==================================
# APP
# ==================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
LOG_LEVEL=info
DEBUG=false
```

**Save** file tersebut.

---

## 7. Jalankan Bot

### 7.1. Test Mode (Development)

```bash
npm run bot
```

**Output yang muncul:**
```
🚀 Starting Basely Telegram Bot...
✅ Bot configuration validated
🔗 Network: Base Sepolia (Chain ID: 84532)
💼 Wallet: 0x1234...
📦 Staking Pool: 0x5678...
✅ Basely bot is running!
📱 Start a chat with your bot on Telegram
```

### 7.2. Buka Telegram

1. Search bot Anda (misalnya: `@BaselyDeFiBot`)
2. Klik START
3. Bot akan balas dengan welcome message!

### 7.3. Test Commands

Coba ketik:
```
/start
/help
/balance
```

Atau pakai natural language:
```
I want to stake 0.01 ETH
Check my balance
Show my rewards
```

---

## 8. Troubleshooting

### ❌ Bot tidak respond

**Cek:**
```bash
# Di terminal tempat bot running, lihat ada error?
# Cek .env file sudah benar?
# Token Telegram valid?
```

**Solusi:**
```bash
# Stop bot (Ctrl+C)
# Restart:
npm run bot
```

### ❌ "Configuration errors"

**Cek file .env:**
```bash
npx tsx scripts/setup.ts
```

Pastikan:
- ✅ `TELEGRAM_BOT_TOKEN` ada
- ✅ `PRIVATE_KEY` mulai dengan `0x`
- ✅ `STAKING_POOL_ADDRESS` ada

### ❌ "Insufficient balance"

**Wallet tidak punya ETH:**
```
Dapatkan testnet ETH lagi dari faucet (lihat step 3)
```

### ❌ "Failed to send transaction"

**Kemungkinan:**
1. RPC URL salah → Cek `.env`
2. Gas terlalu rendah → Tunggu jaringan tidak sibuk
3. Contract address salah → Verify di BaseScan

**Cek contract di BaseScan:**
```
https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS
```

### ❌ Smart contract error

**Verifikasi contract:**
1. Buka BaseScan
2. Paste contract address
3. Lihat tab "Contract"
4. Pastikan ada kode contract

---

## 🎉 Selesai!

Bot Anda sekarang live dan siap dipakai!

### Fitur yang Bisa Digunakan:

✅ `/start` - Mulai bot
✅ `/help` - Lihat commands
✅ `/balance` - Cek saldo ETH
✅ `/stake 0.01` - Stake 0.01 ETH
✅ `/unstake` - Unstake semua
✅ `/rewards` - Lihat rewards

### Natural Language:

✅ "I want to stake 0.05 ETH"
✅ "Check my balance"
✅ "Show my staking info"
✅ "Unstake my ETH"

---

## 📚 Dokumentasi Lengkap

- **README.md** - Full English documentation
- **contracts/README.md** - Smart contract deployment
- **PROJECT_STRUCTURE.md** - Complete file structure

---

## 🆘 Butuh Bantuan?

**GitHub Issues:**
```
https://github.com/yt2025id-lab/Basely/issues
```

**Base Documentation:**
```
https://docs.base.org/
```

**Telegram Bot API:**
```
https://core.telegram.org/bots/api
```

---

## 🚀 Next Steps (Opsional)

### Deploy ke Vercel (Production):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set webhook di BotFather
curl -X POST https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook \
  -d url=https://your-app.vercel.app/api/webhook
```

### Integrate AI (Advanced):

1. Daftar Anthropic: https://console.anthropic.com/
2. Get API key
3. Edit `.env`: `ANTHROPIC_API_KEY=your_key`
4. Update `src/ai/commandParser.ts` untuk pakai Claude API

---

**Happy Coding! 🔥**

*Dibuat dengan ❤️ untuk Base ecosystem*

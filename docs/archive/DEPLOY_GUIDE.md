# 🚀 Deploy StakingPool Contract - Step by Step Guide

## Persiapan

**Yang Dibutuhkan:**
- ✅ MetaMask terinstall
- ✅ Base Sepolia Network sudah ditambahkan
- ✅ Punya minimal 0.01 ETH di Base Sepolia (untuk gas)

---

## STEP 1: Buka Remix IDE

1. Buka browser (Chrome/Firefox/Edge)
2. Ke URL: **https://remix.ethereum.org/**
3. Tunggu sampai Remix loading selesai

---

## STEP 2: Buat File Contract

1. **Di panel kiri**, klik icon **"File Explorer"** (icon folder)
2. **Klik kanan** di folder "contracts"
3. Pilih **"New File"**
4. Nama file: `StakingPool.sol`
5. Tekan Enter

---

## STEP 3: Copy Contract Code

1. **Buka File Explorer Windows**
2. Navigate ke: `C:\Users\T470\Documents\Basely\contracts\StakingPool.sol`
3. **Klik kanan** file → Open with Notepad
4. **Select All** (Ctrl+A)
5. **Copy** (Ctrl+C)
6. **Kembali ke Remix IDE**
7. **Paste** di editor StakingPool.sol (Ctrl+V)
8. **Save** (Ctrl+S)

---

## STEP 4: Compile Contract

1. **Klik tab "Solidity Compiler"** (icon huruf S di panel kiri)
2. **Compiler Version**: Pilih `0.8.20` atau lebih tinggi (misalnya 0.8.24)
3. **Klik tombol biru "Compile StakingPool.sol"**
4. Tunggu beberapa detik
5. **Cek ada checkmark hijau ✅** = sukses compile

**Kalau ada error:**
- Pastikan version 0.8.20+
- Pastikan code sudah lengkap di-paste

---

## STEP 5: Connect MetaMask

1. **Klik tab "Deploy & Run Transactions"** (icon Ethereum di panel kiri)
2. **ENVIRONMENT**: Dropdown → Pilih `Injected Provider - MetaMask`
3. **MetaMask akan popup** → Klik "Next" → "Connect"
4. **Di MetaMask**, pastikan network adalah **Base Sepolia**
   - Kalau masih Ethereum Mainnet, switch ke Base Sepolia
5. **Account**: Pastikan address yang terlihat di Remix sama dengan MetaMask

---

## STEP 6: Deploy Contract

1. **CONTRACT**: Pastikan dropdown menunjukkan `StakingPool`
2. **Klik tombol orange "Deploy"**
3. **MetaMask popup** akan muncul:
   - **Gas Fee**: Biasanya ~0.001-0.005 ETH
   - Klik **"Confirm"**
4. **Tunggu 10-60 detik** (sampai transaksi confirmed)

**Indikator Sukses:**
- Di console (bawah Remix) muncul checkmark ✅
- Di "Deployed Contracts" muncul contract baru

---

## STEP 7: Copy Contract Address

1. **Di panel "Deployed Contracts"** (bagian bawah)
2. **Klik contract** untuk expand
3. **Klik icon "Copy"** di sebelah address contract
4. Address akan berbentuk: `0x1234567890abcdef...` (42 karakter)

**SIMPAN ADDRESS INI!** Kita butuh untuk .env

---

## STEP 8: Verify di BaseScan (Opsional tapi Recommended)

1. Copy contract address
2. Buka: **https://sepolia.basescan.org/**
3. Paste address di search box
4. Klik search
5. **Anda akan lihat**:
   - Contract creation transaction
   - Balance: 0 ETH (belum ada rewards)
   - Code: (belum verified)

---

## STEP 9: Fund Contract dengan Rewards

Contract perlu ETH untuk bayar rewards ke stakers.

**Via MetaMask:**
1. Buka MetaMask
2. Klik **"Send"**
3. **To**: Paste contract address
4. **Amount**: `0.1` ETH (untuk rewards)
5. Klik **"Next"** → **"Confirm"**
6. Tunggu transaksi confirmed

**Verify:**
1. Kembali ke BaseScan
2. Refresh halaman contract
3. **Balance sekarang**: 0.1 ETH ✅

---

## STEP 10: Update .env File

1. Buka file: `C:\Users\T470\Documents\Basely\.env`
2. Cari baris: `STAKING_POOL_ADDRESS=`
3. Paste address contract:
   ```
   STAKING_POOL_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
   ```
4. **Save** file

---

## ✅ SELESAI!

Contract sudah deployed! Sekarang test:

```bash
cd "C:\Users\T470\Documents\Basely"
npx tsx scripts/setup.ts
```

Kalau ada ✅ di "StakingPool contract address configured", berarti sukses!

---

## 🆘 Troubleshooting

### Error: "Gas estimation failed"
- **Penyebab**: Wallet tidak punya cukup ETH
- **Solusi**: Get more ETH from faucet

### Error: "User rejected transaction"
- **Penyebab**: Anda klik "Reject" di MetaMask
- **Solusi**: Coba lagi, klik "Confirm"

### Contract deployed tapi balance 0
- **Normal!** Contract baru deploy balance nya 0
- **Solusi**: Fund contract (Step 9)

### Tidak bisa find contract di BaseScan
- **Tunggu 1-2 menit** setelah deploy
- **Refresh** halaman BaseScan
- **Cek address** benar atau tidak

---

## 📝 Checklist

```
☐ Buka Remix IDE
☐ Buat file StakingPool.sol
☐ Copy code dari local file
☐ Compile dengan 0.8.20+
☐ Connect MetaMask (Injected Provider)
☐ Switch network ke Base Sepolia
☐ Deploy contract
☐ Confirm di MetaMask
☐ Copy contract address
☐ Verify di BaseScan
☐ Fund contract 0.1 ETH
☐ Update .env file
☐ Run setup wizard
```

---

**Contract Address Anda:**
```
Paste di sini setelah deploy: 0x___________________
```

**Transaction Hash:**
```
Paste di sini: 0x___________________
```

**BaseScan Link:**
```
https://sepolia.basescan.org/address/0x___________________
```

---

Butuh bantuan? Tanya saya! 🚀

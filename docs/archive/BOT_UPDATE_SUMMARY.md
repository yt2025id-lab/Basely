# Telegram Bot Update Summary - MockETH Integration

## Files Modified:

### 1. **lib/config.ts** ✅
- Added `mockETH` address to contracts configuration
- Path: `config.contracts.mockETH`

### 2. **lib/stakingPool.ts** ✅
- Updated ABI to support new contract functions:
  - `stakes()` - Read stake data from mapping
  - `getRewardBalance()` - Check MockETH reward pool
  - `getStakedBalance()` - Check total ETH staked
  - `mockETH()` - Get MockETH token address
- Updated `getStakeInfo()` to use `stakes()` mapping + `calculateReward()`
- Updated `formatStakeInfo()` to show:
  - Rewards in mockETH (not ETH)
  - Time elapsed
  - Informational message about MockETH rewards
- Updated success messages to mention mockETH tokens and include BaseScan links

### 3. **lib/mockETH.ts** ✅ (NEW FILE)
- Created new library for MockETH token interactions
- Functions:
  - `getMockETHBalance(address)` - Get mockETH balance
  - `claimMockETHFaucet()` - Claim free 10 mockETH
  - `getMockETHInfo()` - Get token info (name, symbol, decimals)
- Full ERC20 ABI for MockETH contract

## New Bot Commands to Add:

Update `src/bot/handlers.ts` to add these handlers:

### 1. **/mystake** - View Staking Info
```typescript
export async function handleMyStake(ctx: Context) {
  try {
    await ctx.reply('🔍 Checking your staking info...');

    const stakeInfo = await getStakeInfo(config.blockchain.walletAddress);
    const mockETHBalance = await getMockETHBalance(config.blockchain.walletAddress);

    let message = formatStakeInfo(stakeInfo);
    message += `\n\n💎 MockETH Balance: ${mockETHBalance} mockETH`;

    await ctx.reply(message);
  } catch (error: any) {
    await ctx.reply(`❌ Error: ${error.message}`);
  }
}
```

### 2. **/claim** - Claim Rewards
```typescript
export async function handleClaim(ctx: Context) {
  try {
    await ctx.reply('⏳ Claiming your mockETH rewards...');

    const result = await claimRewards();

    if (result.success) {
      const mockETHBalance = await getMockETHBalance(config.blockchain.walletAddress);
      await ctx.reply(result.message + `\n\n💎 New MockETH Balance: ${mockETHBalance} mockETH`);
    } else {
      await ctx.reply(`❌ ${result.message}`);
    }
  } catch (error: any) {
    await ctx.reply(`❌ Error claiming rewards: ${error.message}`);
  }
}
```

### 3. **/mocketh** - Claim Free MockETH
```typescript
export async function handleMockETHFaucet(ctx: Context) {
  try {
    await ctx.reply('⏳ Claiming 10 mockETH from faucet...');

    const result = await claimMockETHFaucet();

    if (result.success) {
      const mockETHBalance = await getMockETHBalance(config.blockchain.walletAddress);
      await ctx.reply(result.message + `\n\n💎 New MockETH Balance: ${mockETHBalance} mockETH`);
    } else {
      await ctx.reply(`❌ ${result.message}`);
    }
  } catch (error: any) {
    await ctx.reply(`❌ Error claiming mockETH: ${error.message}`);
  }
}
```

### 4. Update **/balance** Handler
```typescript
export async function handleBalance(ctx: Context) {
  try {
    await ctx.reply('🔍 Checking your balance...');

    const ethBalance = await getETHBalance(config.blockchain.walletAddress);
    const mockETHBalance = await getMockETHBalance(config.blockchain.walletAddress);

    const message = `💰 Your Balance\n\n` +
      `ETH: ${parseFloat(ethBalance).toFixed(4)} ETH\n` +
      `mockETH: ${parseFloat(mockETHBalance).toFixed(4)} mockETH\n\n` +
      `Address: ${config.blockchain.walletAddress}\n\n` +
      `Network: Base Sepolia Testnet`;

    await ctx.reply(message);
  } catch (error: any) {
    await ctx.reply(`❌ Error checking balance: ${error.message}`);
  }
}
```

### 5. Update **/help** Command
Add to command list:
```
/mystake - View your staking info and pending rewards
/claim - Claim pending mockETH rewards
/mocketh - Claim 10 free mockETH from faucet
```

## Update src/bot/index.ts:

Add command registrations:
```typescript
bot.command('mystake', handleMyStake);
bot.command('claim', handleClaim);
bot.command('mocketh', handleMockETHFaucet);
```

Add imports:
```typescript
import { getMockETHBalance, claimMockETHFaucet } from '../../lib/mockETH';
```

## Environment Variables Required:

Update `.env`:
```bash
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0x9bE85362af4d9224cab1F51b7B8Dc4ebc6DB40bF
```

## Testing Checklist:

After updating handlers:
- [ ] Test `/balance` - Should show both ETH and mockETH
- [ ] Test `/stake 0.01` - Stake ETH
- [ ] Test `/mystake` - View stake info with mockETH rewards
- [ ] Test `/claim` - Claim mockETH rewards
- [ ] Test `/mocketh` - Claim free 10 mockETH from faucet
- [ ] Test `/unstake` - Unstake ETH + claim mockETH
- [ ] Test natural language: "claim my rewards"
- [ ] Verify all transaction links work on BaseScan

## Key Changes Summary:

1. **Rewards are now MockETH tokens**, not native ETH
2. **Staking still uses native ETH**, rewards paid in mockETH
3. **Free faucet** available for testing (10 mockETH per claim, unlimited)
4. **Balance command** now shows both ETH and mockETH
5. **All transaction messages** include BaseScan links
6. **Stake info** shows time elapsed and rewards in mockETH

## How to Apply Updates:

1. Copy new handlers from this summary to `src/bot/handlers.ts`
2. Update imports in `src/bot/handlers.ts`:
   ```typescript
   import { getMockETHBalance, claimMockETHFaucet } from '../../lib/mockETH';
   ```
3. Register new commands in `src/bot/index.ts`
4. Update `/start` and `/help` messages to mention mockETH rewards
5. Test all commands before going live

---

**Note**: All contract addresses and ABIs are already configured. Just need to add the handler functions and register the commands!

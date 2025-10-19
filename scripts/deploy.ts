/**
 * Deploy StakingPool contract to Base Sepolia
 * Run: npx tsx scripts/deploy.ts
 */

import { createWalletClient, createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Contract bytecode and ABI (from compiled Solidity)
// This is a placeholder - you'll get this after compiling StakingPool.sol
const STAKING_POOL_BYTECODE = '0x'; // Will be filled after compilation

async function main() {
  console.log('🚀 Starting StakingPool deployment to Base Sepolia...\n');

  // Validate environment
  if (!process.env.PRIVATE_KEY) {
    throw new Error('❌ PRIVATE_KEY not found in .env');
  }
  if (!process.env.BASE_RPC_URL) {
    throw new Error('❌ BASE_RPC_URL not found in .env');
  }

  // Setup clients
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(process.env.BASE_RPC_URL),
  });
  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(process.env.BASE_RPC_URL),
  });

  console.log(`📍 Deploying from: ${account.address}`);

  // Check balance
  const balance = await publicClient.getBalance({ address: account.address });
  console.log(`💰 Balance: ${Number(balance) / 1e18} ETH\n`);

  if (balance === 0n) {
    console.log('❌ No ETH in wallet!');
    console.log('Get testnet ETH from: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet\n');
    return;
  }

  console.log('⚠️  MANUAL DEPLOYMENT REQUIRED\n');
  console.log('Since we need the compiled bytecode, please deploy via Remix IDE:\n');
  console.log('1. Go to: https://remix.ethereum.org/');
  console.log('2. Create new file: StakingPool.sol');
  console.log('3. Copy contract from: contracts/StakingPool.sol');
  console.log('4. Compile with Solidity 0.8.20+');
  console.log('5. Deploy & Run:');
  console.log('   - Environment: "Injected Provider - MetaMask"');
  console.log('   - Network: Base Sepolia');
  console.log('   - Click "Deploy"');
  console.log('6. Copy deployed address to .env as STAKING_POOL_ADDRESS\n');
  console.log('7. Fund contract with rewards:');
  console.log('   - Send 0.1 ETH to contract address via MetaMask\n');
}

main()
  .then(() => {
    console.log('✅ Deployment guide completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });

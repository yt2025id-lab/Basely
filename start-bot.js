/**
 * Basely Bot Launcher - Long Polling Mode
 * Simple starter for hackathon deployment (no webhook required)
 */

// Load environment variables
require('dotenv').config();

// Use tsx to run TypeScript files directly
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Basely Bot - Starting in Long Polling Mode...\n');

// Check required environment variables
const requiredEnvVars = [
  'TELEGRAM_BOT_TOKEN',
  'WALLET_ADDRESS',
  'PRIVATE_KEY',
  'RPC_URL',
  'STAKING_POOL_ADDRESS',
  'MOCK_ETH_ADDRESS'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\n💡 Please set them in .env file or environment\n');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('🔗 Network: Base Sepolia');
console.log(`💼 Wallet: ${process.env.WALLET_ADDRESS}`);
console.log(`📦 Staking Pool: ${process.env.STAKING_POOL_ADDRESS}`);
console.log(`🪙 MockETH Token: ${process.env.MOCK_ETH_ADDRESS}\n`);

// Run the bot using tsx
const botProcess = spawn('npx', ['tsx', 'src/bot/index.ts'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

botProcess.on('error', (error) => {
  console.error('❌ Failed to start bot:', error);
  process.exit(1);
});

botProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Bot process exited with code ${code}`);
    process.exit(code);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping bot gracefully...');
  botProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n👋 Stopping bot gracefully...');
  botProcess.kill('SIGTERM');
});

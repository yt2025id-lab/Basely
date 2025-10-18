/**
 * Telegram Bot Entry Point
 * Main bot configuration and startup
 */

import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import {
  handleStart,
  handleHelp,
  handleBalance,
  handleStake,
  handleUnstake,
  handleRewards,
  handleSwap,
  handleMessage,
  handleError,
} from './handlers';
import { config, validateConfig } from '../../lib/config';

// Load environment variables
dotenv.config();

/**
 * Initialize and start the Telegram bot
 */
async function startBot() {
  console.log('🚀 Starting Basely Telegram Bot...');

  // Validate configuration
  if (!validateConfig()) {
    console.error('❌ Configuration validation failed');
    process.exit(1);
  }

  // Create bot instance
  const bot = new Telegraf(config.telegram.botToken);

  // Register command handlers
  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('balance', handleBalance);
  bot.command('stake', handleStake);
  bot.command('unstake', handleUnstake);
  bot.command('rewards', handleRewards);
  bot.command('swap', handleSwap);

  // Handle all text messages with natural language processing
  bot.on('text', handleMessage);

  // Error handling
  bot.catch(handleError);

  // Launch bot
  try {
    console.log('✅ Bot configuration validated');
    console.log(`🔗 Network: Base Sepolia (Chain ID: ${config.blockchain.chainId})`);
    console.log(`💼 Wallet: ${config.blockchain.walletAddress}`);
    console.log(`📦 Staking Pool: ${config.contracts.stakingPool || 'Not deployed yet'}`);

    // Start polling for updates
    await bot.launch();

    console.log('✅ Basely bot is running!');
    console.log('📱 Start a chat with your bot on Telegram');

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
if (require.main === module) {
  startBot();
}

export { startBot };

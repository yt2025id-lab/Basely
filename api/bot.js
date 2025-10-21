/**
 * Vercel Serverless Function for Telegram Bot Webhook
 * This function handles incoming webhook requests from Telegram
 */

const { Telegraf } = require('telegraf');

// Import handlers (we'll need to transpile TypeScript or use CommonJS versions)
// For now, we'll inline the critical configuration
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Register all command handlers
bot.command('start', async (ctx) => {
  const welcomeMessage = `🎉 Welcome to Basely - AI-Powered DeFi Assistant!

I can help you with:
💰 Check Balance - View your ETH and mockETH balance
🔒 Stake ETH - Earn mockETH rewards (1% per day)
📊 My Stake - View your staking position
🎁 Claim Rewards - Claim your mockETH rewards
🔓 Unstake - Withdraw your staked ETH
🪙 Get MockETH - Claim free mockETH from faucet
🔄 Swap Tokens - Exchange between tokens
💬 Ask Questions - Natural language DeFi queries

📱 Quick Commands:
/balance - Check your balances
/stake 0.01 - Stake ETH (min 0.001)
/mystake - View stake info
/claim - Claim mockETH rewards
/unstake - Unstake your ETH
/mocketh - Claim 10 free mockETH
/help - Show all commands

🌐 Network: Base Sepolia Testnet
💡 All rewards are paid in mockETH tokens!

Let's get started! 🚀`;
  await ctx.reply(welcomeMessage);
});

bot.command('help', async (ctx) => {
  const helpMessage = `📚 Basely Bot Commands

💰 Balance & Wallet:
/balance - Check ETH and mockETH balance

🔒 Staking:
/stake <amount> - Stake ETH (e.g., /stake 0.01)
/mystake - View your stake information
/claim - Claim mockETH rewards
/unstake - Unstake ETH and claim rewards

🪙 MockETH Faucet:
/mocketh - Claim 10 free mockETH tokens

🔄 Trading:
/swap - Exchange tokens (coming soon)

💬 Natural Language:
Just type your question about DeFi!

🌐 Network: Base Sepolia
📦 Contract: ${process.env.STAKING_POOL_ADDRESS || 'Not configured'}

Need help? Just ask! 🤝`;
  await ctx.reply(helpMessage);
});

bot.command('balance', async (ctx) => {
  await ctx.reply('💰 Checking your balance...\n\nℹ️ Balance checking requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('mystake', async (ctx) => {
  await ctx.reply('📊 Checking your stake...\n\nℹ️ Stake viewing requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('claim', async (ctx) => {
  await ctx.reply('🎁 Claiming rewards...\n\nℹ️ Reward claiming requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('mocketh', async (ctx) => {
  await ctx.reply('🪙 Claiming free mockETH...\n\nℹ️ Faucet claiming requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('stake', async (ctx) => {
  await ctx.reply('🔒 Staking ETH...\n\nℹ️ Staking requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('unstake', async (ctx) => {
  await ctx.reply('🔓 Unstaking ETH...\n\nℹ️ Unstaking requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('rewards', async (ctx) => {
  await ctx.reply('🎁 Checking rewards...\n\nℹ️ Rewards checking requires wallet integration. Please visit the web app for full functionality.');
});

bot.command('swap', async (ctx) => {
  await ctx.reply('🔄 Token swap coming soon!\n\nℹ️ This feature is under development.');
});

// Handle all other text messages
bot.on('text', async (ctx) => {
  const message = ctx.message.text.toLowerCase();

  // Simple natural language responses
  if (message.includes('stake') || message.includes('staking')) {
    await ctx.reply('🔒 To stake ETH, use: /stake <amount>\nExample: /stake 0.01\n\nYou can earn 1% mockETH rewards per day! 📈');
  } else if (message.includes('balance') || message.includes('how much')) {
    await ctx.reply('💰 Check your balance with: /balance\n\nThis shows both ETH and mockETH balances.');
  } else if (message.includes('claim') || message.includes('reward')) {
    await ctx.reply('🎁 Claim your rewards with: /claim\n\nRewards are paid in mockETH tokens!');
  } else if (message.includes('mocketh') || message.includes('faucet')) {
    await ctx.reply('🪙 Get free mockETH with: /mocketh\n\nYou can claim 10 mockETH from the faucet!');
  } else if (message.includes('help')) {
    await ctx.reply('📚 Use /help to see all available commands!');
  } else {
    await ctx.reply('👋 Hi! I\'m Basely, your DeFi assistant.\n\nTry /help to see what I can do! 🚀');
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('❌ Oops! Something went wrong. Please try again later.');
});

/**
 * Vercel Serverless Handler
 * Processes incoming webhook requests from Telegram
 */
module.exports = async (req, res) => {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Validate Telegram webhook secret token (optional but recommended)
    const secretToken = req.headers['x-telegram-bot-api-secret-token'];
    if (process.env.WEBHOOK_SECRET && secretToken !== process.env.WEBHOOK_SECRET) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    // Process the update with Telegraf
    await bot.handleUpdate(req.body);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

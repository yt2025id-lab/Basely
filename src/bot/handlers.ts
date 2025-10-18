/**
 * Telegram bot message handlers
 * Handles all user commands and natural language messages
 */

import { Context } from 'telegraf';
import { parseCommand, generateSuggestion } from '../ai/commandParser';
import { getETHBalance } from '../../lib/blockchain';
import { stakeETH, unstakeETH, getStakeInfo, formatStakeInfo } from '../../lib/stakingPool';
import { config } from '../../lib/config';
import { SUPPORTED_COMMANDS } from '../../lib/types';

/**
 * Handle /start command
 */
export async function handleStart(ctx: Context) {
  const welcomeMessage = `🎉 Welcome to Basely!

Your AI-powered DeFi assistant on Base blockchain.

I can help you:
💰 Stake ETH to earn rewards
📊 Check your balance and staking info
🔄 Swap tokens (coming soon)
🌾 Farm yields (coming soon)

Try saying:
- "Stake 0.1 ETH"
- "Check my balance"
- "Show my staking info"

Or type /help for all commands.

Let's make DeFi simple! 🚀`;

  await ctx.reply(welcomeMessage);
}

/**
 * Handle /help command
 */
export async function handleHelp(ctx: Context) {
  let helpMessage = `📚 Basely Commands\n\n`;

  SUPPORTED_COMMANDS.forEach(cmd => {
    helpMessage += `${cmd.command}\n`;
    helpMessage += `  ${cmd.description}\n`;
    helpMessage += `  Example: ${cmd.example}\n\n`;
  });

  helpMessage += `💡 You can also use natural language!\n`;
  helpMessage += `Just tell me what you want to do, like:\n`;
  helpMessage += `"I want to stake 0.5 ETH"\n`;
  helpMessage += `"Unstake my ETH"\n`;
  helpMessage += `"How much ETH do I have?"\n\n`;

  helpMessage += `🔗 Useful Links:\n`;
  helpMessage += `Base Sepolia Explorer: https://sepolia.basescan.org/\n`;
  helpMessage += `Base Sepolia Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet`;

  await ctx.reply(helpMessage);
}

/**
 * Handle /balance command
 */
export async function handleBalance(ctx: Context) {
  try {
    await ctx.reply('🔍 Checking your balance...');

    const balance = await getETHBalance(config.blockchain.walletAddress);

    const message = `💰 Your Balance\n\n` +
      `ETH: ${parseFloat(balance).toFixed(4)} ETH\n` +
      `Address: ${config.blockchain.walletAddress}\n\n` +
      `Network: Base Sepolia Testnet`;

    await ctx.reply(message);
  } catch (error: any) {
    console.error('Error getting balance:', error);
    await ctx.reply(`❌ Error checking balance: ${error.message}`);
  }
}

/**
 * Handle /stake command
 */
export async function handleStake(ctx: Context) {
  try {
    // Extract amount from command
    const text = (ctx.message as any)?.text || '';
    const amount = extractAmountFromCommand(text);

    if (!amount) {
      await ctx.reply(
        `Please specify an amount to stake.\n\n` +
        `Example: /stake 0.1\n` +
        `Or: "Stake 0.1 ETH"`
      );
      return;
    }

    await ctx.reply(`⏳ Staking ${amount} ETH...`);

    const result = await stakeETH(amount);

    if (result.success) {
      await ctx.reply(result.message);
    } else {
      await ctx.reply(`❌ ${result.message}`);
    }
  } catch (error: any) {
    console.error('Error staking:', error);
    await ctx.reply(`❌ Error staking ETH: ${error.message}`);
  }
}

/**
 * Handle /unstake command
 */
export async function handleUnstake(ctx: Context) {
  try {
    await ctx.reply('⏳ Unstaking your ETH...');

    const result = await unstakeETH();

    if (result.success) {
      await ctx.reply(result.message);
    } else {
      await ctx.reply(`❌ ${result.message}`);
    }
  } catch (error: any) {
    console.error('Error unstaking:', error);
    await ctx.reply(`❌ Error unstaking ETH: ${error.message}`);
  }
}

/**
 * Handle /rewards command
 */
export async function handleRewards(ctx: Context) {
  try {
    await ctx.reply('🔍 Checking your staking info...');

    const stakeInfo = await getStakeInfo(config.blockchain.walletAddress);
    const message = formatStakeInfo(stakeInfo);

    await ctx.reply(message);
  } catch (error: any) {
    console.error('Error getting rewards:', error);
    await ctx.reply(`❌ Error checking rewards: ${error.message}`);
  }
}

/**
 * Handle /swap command (placeholder)
 */
export async function handleSwap(ctx: Context) {
  await ctx.reply(
    `🔄 Token swapping is coming soon!\n\n` +
    `We're working on integrating with Uniswap on Base.\n` +
    `Stay tuned! 🚀`
  );
}

/**
 * Handle natural language messages
 */
export async function handleMessage(ctx: Context) {
  try {
    const text = (ctx.message as any)?.text || '';

    if (!text) {
      return;
    }

    // Parse the command
    const intent = parseCommand(text);

    console.log('Parsed intent:', intent);

    // Handle based on intent
    switch (intent.action) {
      case 'stake':
        if (intent.amount) {
          await ctx.reply(`⏳ Staking ${intent.amount} ETH...`);
          const result = await stakeETH(intent.amount);
          await ctx.reply(result.success ? result.message : `❌ ${result.message}`);
        } else {
          const suggestion = generateSuggestion(intent);
          await ctx.reply(suggestion);
        }
        break;

      case 'unstake':
        await handleUnstake(ctx);
        break;

      case 'balance':
        await handleBalance(ctx);
        break;

      case 'help':
        await handleHelp(ctx);
        break;

      case 'swap':
        await handleSwap(ctx);
        break;

      case 'farm':
        await ctx.reply(
          `🌾 Yield farming is coming soon!\n\n` +
          `We're building liquidity pool integrations.\n` +
          `Stay tuned! 🚀`
        );
        break;

      case 'unknown':
      default:
        const suggestion = generateSuggestion(intent);
        await ctx.reply(suggestion || `I didn't understand that. Type /help for available commands.`);
        break;
    }
  } catch (error: any) {
    console.error('Error handling message:', error);
    await ctx.reply(`❌ Something went wrong: ${error.message}`);
  }
}

/**
 * Extract amount from command text
 */
function extractAmountFromCommand(text: string): string | undefined {
  const match = text.match(/(\d+\.?\d*)/);
  if (match && match[1]) {
    const amount = parseFloat(match[1]);
    if (!isNaN(amount) && amount > 0) {
      return amount.toString();
    }
  }
  return undefined;
}

/**
 * Handle errors
 */
export async function handleError(error: any, ctx: Context) {
  console.error('Bot error:', error);
  try {
    await ctx.reply('❌ An error occurred. Please try again later.');
  } catch (replyError) {
    console.error('Failed to send error message:', replyError);
  }
}

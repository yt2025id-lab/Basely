/**
 * Telegram Webhook API Route
 * Handles incoming updates from Telegram when deployed on Vercel
 */

import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';
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
} from '@/src/bot/handlers';
import { config } from '@/lib/config';

// Initialize bot
const bot = new Telegraf(config.telegram.botToken);

// Register handlers
bot.command('start', handleStart);
bot.command('help', handleHelp);
bot.command('balance', handleBalance);
bot.command('stake', handleStake);
bot.command('unstake', handleUnstake);
bot.command('rewards', handleRewards);
bot.command('swap', handleSwap);
bot.on('text', handleMessage);
bot.catch(handleError);

/**
 * Handle POST requests from Telegram
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('Received webhook update:', body);

    // Process the update
    await bot.handleUpdate(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests (for health check)
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Basely Telegram webhook is running',
    timestamp: new Date().toISOString(),
  });
}

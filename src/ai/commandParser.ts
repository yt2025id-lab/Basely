/**
 * AI-powered command parser for natural language processing
 * Parses user messages and extracts DeFi action intents
 */

import type { CommandIntent } from '@/lib/types';

/**
 * Parse natural language command into structured intent
 * This is a simple rule-based parser. Can be enhanced with AI APIs later.
 * @param message User's message
 * @returns Parsed command intent
 */
export function parseCommand(message: string): CommandIntent {
  const lowerMessage = message.toLowerCase().trim();

  // Remove common filler words
  const cleanedMessage = lowerMessage
    .replace(/please|can you|could you|i want to|i'd like to|help me/gi, '')
    .trim();

  // Stake intent
  if (isStakeIntent(cleanedMessage)) {
    const amount = extractAmount(cleanedMessage);
    return {
      action: 'stake',
      amount,
      confidence: amount ? 0.9 : 0.7,
    };
  }

  // Unstake intent
  if (isUnstakeIntent(cleanedMessage)) {
    return {
      action: 'unstake',
      confidence: 0.9,
    };
  }

  // Swap intent
  if (isSwapIntent(cleanedMessage)) {
    const amount = extractAmount(cleanedMessage);
    const { from, to } = extractSwapTokens(cleanedMessage);
    return {
      action: 'swap',
      amount,
      tokenFrom: from,
      tokenTo: to,
      confidence: amount && from && to ? 0.9 : 0.6,
    };
  }

  // Balance intent
  if (isBalanceIntent(cleanedMessage)) {
    return {
      action: 'balance',
      confidence: 0.95,
    };
  }

  // Help intent
  if (isHelpIntent(cleanedMessage)) {
    return {
      action: 'help',
      confidence: 0.95,
    };
  }

  // Farm/Yield intent
  if (isFarmIntent(cleanedMessage)) {
    return {
      action: 'farm',
      confidence: 0.7,
    };
  }

  // Unknown intent
  return {
    action: 'unknown',
    confidence: 0,
  };
}

/**
 * Check if message indicates stake intent
 */
function isStakeIntent(message: string): boolean {
  const stakeKeywords = ['stake', 'staking', 'deposit', 'lock', 'earn rewards'];
  return stakeKeywords.some(keyword => message.includes(keyword));
}

/**
 * Check if message indicates unstake intent
 */
function isUnstakeIntent(message: string): boolean {
  const unstakeKeywords = ['unstake', 'withdraw', 'remove', 'pull out', 'take out'];
  return unstakeKeywords.some(keyword => message.includes(keyword));
}

/**
 * Check if message indicates swap intent
 */
function isSwapIntent(message: string): boolean {
  const swapKeywords = ['swap', 'exchange', 'trade', 'convert'];
  return swapKeywords.some(keyword => message.includes(keyword));
}

/**
 * Check if message indicates balance intent
 */
function isBalanceIntent(message: string): boolean {
  const balanceKeywords = ['balance', 'how much', 'check', 'show me', 'wallet'];
  return balanceKeywords.some(keyword => message.includes(keyword));
}

/**
 * Check if message indicates help intent
 */
function isHelpIntent(message: string): boolean {
  const helpKeywords = ['help', 'what can', 'commands', 'how to', 'guide'];
  return helpKeywords.some(keyword => message.includes(keyword));
}

/**
 * Check if message indicates farm intent
 */
function isFarmIntent(message: string): boolean {
  const farmKeywords = ['farm', 'yield', 'liquidity', 'pool', 'provide'];
  return farmKeywords.some(keyword => message.includes(keyword));
}

/**
 * Extract numeric amount from message
 * Supports formats like: "0.1 ETH", "1.5", "0.001 eth"
 */
function extractAmount(message: string): string | undefined {
  // Try to match number followed by optional ETH
  const patterns = [
    /(\d+\.?\d*)\s*eth/i,
    /(\d+\.?\d*)\s*(?:ether|ethereum)/i,
    /(\d+\.?\d*)/,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      const amount = parseFloat(match[1]);
      if (!isNaN(amount) && amount > 0) {
        return amount.toString();
      }
    }
  }

  return undefined;
}

/**
 * Extract token pair from swap message
 * Examples: "swap ETH to USDC", "exchange 1 ETH for DAI"
 */
function extractSwapTokens(message: string): { from?: string; to?: string } {
  // Common token symbols
  const tokens = ['eth', 'usdc', 'usdt', 'dai', 'weth', 'wbtc'];

  // Try patterns like "ETH to USDC" or "ETH for USDC"
  const patterns = [
    /(\w+)\s+(?:to|for|into)\s+(\w+)/i,
    /from\s+(\w+)\s+to\s+(\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      const from = match[1]?.toLowerCase();
      const to = match[2]?.toLowerCase();

      if (tokens.includes(from) && tokens.includes(to)) {
        return { from: from.toUpperCase(), to: to.toUpperCase() };
      }
    }
  }

  return {};
}

/**
 * Generate helpful suggestion based on low confidence intent
 */
export function generateSuggestion(intent: CommandIntent): string {
  if (intent.confidence < 0.5) {
    return `I'm not sure what you want to do. Try:\n` +
      `- "Stake 0.1 ETH"\n` +
      `- "Check my balance"\n` +
      `- "Unstake my ETH"\n` +
      `- "Help" for more commands`;
  }

  if (intent.action === 'stake' && !intent.amount) {
    return `How much ETH would you like to stake? Example: "Stake 0.1 ETH"`;
  }

  if (intent.action === 'swap' && (!intent.tokenFrom || !intent.tokenTo)) {
    return `Please specify which tokens to swap. Example: "Swap 0.1 ETH to USDC"`;
  }

  return '';
}

/**
 * Enhanced parser using AI API (placeholder for future integration)
 * This can be integrated with Anthropic Claude or OpenAI
 */
export async function parseCommandWithAI(message: string): Promise<CommandIntent> {
  // TODO: Integrate with Anthropic Claude API
  // For now, fall back to rule-based parser

  // Example integration with Claude:
  /*
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Parse this DeFi command into JSON: "${message}".
                Return: {"action": "stake|unstake|swap|balance|help", "amount": "0.1", "confidence": 0.9}`
    }]
  });

  return JSON.parse(response.content[0].text);
  */

  return parseCommand(message);
}

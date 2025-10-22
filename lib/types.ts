/**
 * Type definitions for Basely DeFi Assistant
 */

export interface UserContext {
  telegramId: number;
  username?: string;
  walletAddress?: string;
}

export interface CommandIntent {
  action: 'stake' | 'unstake' | 'swap' | 'farm' | 'balance' | 'help' | 'unknown';
  amount?: string;
  tokenFrom?: string;
  tokenTo?: string;
  params?: Record<string, any>;
  confidence: number;
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  message: string;
}

export interface StakeInfo {
  amount: bigint;
  timestamp: bigint;
  pendingReward: bigint;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  address: string;
}

export interface SwapQuote {
  amountIn: bigint;
  amountOut: bigint;
  tokenIn: string;
  tokenOut: string;
  priceImpact: number;
}

export interface BotCommand {
  command: string;
  description: string;
  example: string;
}

export const SUPPORTED_COMMANDS: BotCommand[] = [
  {
    command: '/start',
    description: 'Start the bot and get welcome message',
    example: '/start',
  },
  {
    command: '/help',
    description: 'Show available commands',
    example: '/help',
  },
  {
    command: '/balance',
    description: 'Check your ETH balance',
    example: '/balance',
  },
  {
    command: '/stake',
    description: 'Stake ETH to earn rewards',
    example: '/stake 0.1 or "I want to stake 0.1 ETH"',
  },
  {
    command: '/unstake',
    description: 'Unstake your ETH and claim rewards',
    example: '/unstake or "Unstake my ETH"',
  },
  {
    command: '/rewards',
    description: 'Check your staking rewards',
    example: '/rewards',
  },
  {
    command: '/swap',
    description: 'Swap tokens (coming soon)',
    example: '/swap 0.1 ETH to USDC',
  },
];

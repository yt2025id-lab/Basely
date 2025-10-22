/**
 * Configuration file for Basely DeFi Assistant
 * Loads environment variables and exports configuration
 */

export const config = {
  // Telegram Bot
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    webhookUrl: process.env.TELEGRAM_WEBHOOK_URL || '',
  },

  // Blockchain
  blockchain: {
    rpcUrl: process.env.RPC_URL || process.env.BASE_RPC_URL || 'https://sepolia.base.org',
    chainId: parseInt(process.env.CHAIN_ID || '84532'),
    privateKey: process.env.PRIVATE_KEY as `0x${string}` || '0x',
    walletAddress: process.env.WALLET_ADDRESS as `0x${string}` || '0x',
  },

  // Smart Contracts
  contracts: {
    stakingPool: process.env.STAKING_POOL_ADDRESS as `0x${string}` || '0x',
    mockETH: process.env.MOCK_ETH_ADDRESS as `0x${string}` || '0x',
    weth: process.env.WETH_ADDRESS as `0x${string}` || '0x4200000000000000000000000000000000000006',
    testToken: process.env.TEST_TOKEN_ADDRESS as `0x${string}` || '0x',
    uniswapRouter: process.env.UNISWAP_ROUTER_ADDRESS as `0x${string}` || '0x',
  },

  // AI
  ai: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  },

  // Application
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Security
  security: {
    enableRateLimiting: process.env.ENABLE_RATE_LIMITING === 'true',
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '10'),
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    debug: process.env.DEBUG === 'true',
  },
};

// Validate critical environment variables
export function validateConfig() {
  const errors: string[] = [];

  if (!config.telegram.botToken) {
    errors.push('TELEGRAM_BOT_TOKEN is required');
  }

  if (!config.blockchain.privateKey || config.blockchain.privateKey === '0x') {
    errors.push('PRIVATE_KEY is required');
  }

  if (!config.blockchain.rpcUrl) {
    errors.push('BASE_RPC_URL is required');
  }

  if (errors.length > 0) {
    console.error('Configuration errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    return false;
  }

  return true;
}

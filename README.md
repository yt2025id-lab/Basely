# BASELY

> AI-Powered DeFi Telegram Assistant on Base Blockchain

[![Base](https://img.shields.io/badge/Base-Sepolia-0052FF?style=for-the-badge&logo=ethereum)](https://base.org)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## What is Basely?

**Basely** is an AI-powered DeFi assistant that simplifies blockchain interactions through natural language commands on Telegram. Built on Base blockchain, it makes DeFi accessible to everyone—no technical knowledge required.

### Key Features

- **Natural Language DeFi**: Stake, swap, and farm yields using plain English
- **AI-Powered**: Intelligent command parsing understands your intent
- **Telegram Native**: Chat interface everyone already knows
- **Base Blockchain**: Fast, low-cost transactions on Coinbase's L2
- **Open Source**: MIT licensed, built for the community

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Telegram account
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/basely.git
cd basely

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` with your credentials:

```env
# Telegram Bot Token (get from @BotFather)
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Base Sepolia RPC
BASE_RPC_URL=https://sepolia.base.org

# Your wallet private key (testnet only!)
PRIVATE_KEY=0xYOUR_PRIVATE_KEY

# Deployed staking pool address
STAKING_POOL_ADDRESS=0xYOUR_CONTRACT_ADDRESS
```

### Running the Project

#### Option 1: Run Telegram Bot Locally

```bash
npm run bot
```

Your bot will start polling for messages. Open Telegram and chat with your bot!

#### Option 2: Run Next.js App (with Webhook)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

---

## Project Structure

```
basely/
├── app/                      # Next.js 14 app directory
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts      # Telegram webhook endpoint
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── src/
│   ├── bot/
│   │   ├── index.ts          # Bot entry point
│   │   └── handlers.ts       # Command handlers
│   └── ai/
│       └── commandParser.ts  # NLP command parser
├── lib/
│   ├── blockchain.ts         # Blockchain utilities (viem)
│   ├── stakingPool.ts        # Staking contract interactions
│   ├── config.ts             # Environment configuration
│   └── types.ts              # TypeScript types
├── contracts/
│   ├── StakingPool.sol       # Solidity staking contract
│   └── README.md             # Contract deployment guide
├── .env.example              # Environment template
├── package.json
└── README.md
```

---

## Smart Contract Deployment

### Deploy StakingPool Contract

1. **Using Remix IDE** (Recommended for beginners):
   - Go to [Remix IDE](https://remix.ethereum.org/)
   - Copy `contracts/StakingPool.sol`
   - Compile with Solidity 0.8.20+
   - Switch to Base Sepolia in MetaMask
   - Deploy and copy the contract address

2. **Using Hardhat**:
   ```bash
   npm install --save-dev hardhat
   npx hardhat init
   # Configure hardhat.config.ts for Base Sepolia
   npx hardhat run scripts/deploy.ts --network baseSepolia
   ```

3. **Using Foundry**:
   ```bash
   forge create --rpc-url $BASE_RPC_URL \
     --private-key $PRIVATE_KEY \
     contracts/StakingPool.sol:StakingPool
   ```

4. **Fund the Pool**:
   ```bash
   # Send ETH to contract for rewards
   cast send $STAKING_POOL_ADDRESS \
     --value 1ether \
     --rpc-url $BASE_RPC_URL \
     --private-key $PRIVATE_KEY
   ```

Full deployment guide: [contracts/README.md](contracts/README.md)

---

## Usage Examples

### Telegram Bot Commands

```
/start              - Welcome message and introduction
/help               - Show all available commands
/balance            - Check your ETH balance
/stake <amount>     - Stake ETH (e.g., /stake 0.1)
/unstake            - Unstake all ETH and claim rewards
/rewards            - Check staking info and pending rewards
/swap               - Swap tokens (coming soon)
```

### Natural Language Examples

```
You: "I want to stake 0.5 ETH"
Bot: ⏳ Staking 0.5 ETH...
     ✅ Successfully staked! Tx: 0xabc...

You: "How much ETH do I have?"
Bot: 💰 Your Balance
     ETH: 2.4567 ETH
     Address: 0x1234...

You: "Show my staking info"
Bot: 📊 Your Staking Info
     💰 Staked: 0.5 ETH
     🎁 Pending Rewards: 0.0012 ETH
     📅 Staked Since: 12/15/2024
```

---

## Architecture

### Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Bot**: Telegraf.js (Telegram Bot API)
- **AI**: Rule-based NLP parser (extensible to Claude/OpenAI)
- **Blockchain**: viem (Ethereum library), Base Sepolia L2
- **Smart Contracts**: Solidity 0.8.20, StakingPool
- **Deployment**: Vercel (frontend), Node.js (bot)

### How It Works

1. **User sends message** via Telegram
2. **AI Parser** extracts intent (stake, swap, balance, etc.)
3. **Handler** executes blockchain action using viem
4. **Smart Contract** processes transaction on Base
5. **Bot replies** with confirmation and transaction hash

### Webhook vs Polling

- **Development**: Bot runs with polling (`npm run bot`)
- **Production**: Vercel handles webhook (`app/api/webhook/route.ts`)

To set webhook for production:
```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -d url=https://your-app.vercel.app/api/webhook
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Settings → Environment Variables → Add:
# - TELEGRAM_BOT_TOKEN
# - BASE_RPC_URL
# - PRIVATE_KEY
# - STAKING_POOL_ADDRESS
```

### Set Telegram Webhook

After deploying to Vercel:

```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -d url=https://your-app.vercel.app/api/webhook
```

---

## Development Roadmap

### Phase 1: MVP (Current)
- [x] Telegram bot integration
- [x] Natural language command parsing
- [x] ETH staking on Base Sepolia
- [x] Balance checking
- [x] Staking pool smart contract
- [x] Next.js landing page

### Phase 2: Enhanced Features
- [ ] Token swapping (Uniswap integration)
- [ ] Yield farming pools
- [ ] Multi-token support (USDC, DAI, etc.)
- [ ] Transaction history
- [ ] Price alerts and notifications

### Phase 3: AI Integration
- [ ] Anthropic Claude API integration
- [ ] Advanced intent recognition
- [ ] Multi-step DeFi strategies
- [ ] Portfolio optimization suggestions

### Phase 4: Production
- [ ] Deploy to Base Mainnet
- [ ] Security audit
- [ ] Gas optimization
- [ ] Multi-chain support

---

## Testing

### Test on Base Sepolia

1. Get testnet ETH from [Base Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Deploy StakingPool contract
3. Fund the pool with test ETH
4. Start the bot: `npm run bot`
5. Chat with your bot on Telegram:
   - Try: "Stake 0.01 ETH"
   - Try: "Check my balance"
   - Try: "Show my rewards"

### Verify on BaseScan

All transactions are visible on [Base Sepolia Explorer](https://sepolia.basescan.org/)

---

## Security Notes

**IMPORTANT**:
- This is a **DEMO** project for educational purposes
- DO NOT use with mainnet funds without professional audit
- Always use a dedicated testnet wallet
- Never commit private keys to version control
- The `.gitignore` already excludes `.env` files

**Known Limitations**:
- Bot uses a single wallet (not multi-user)
- No transaction signing confirmation
- Limited error handling for edge cases
- Smart contract not audited

For production use:
- Implement user wallet management
- Add transaction approval flows
- Conduct security audit
- Implement rate limiting
- Add comprehensive error handling

---

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow existing code style
- Add error handling and logging
- Update README for new features
- Test on Base Sepolia before submitting

---

## Troubleshooting

### Bot Not Responding

```bash
# Check bot token
curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe

# Restart bot
npm run bot
```

### Transaction Failing

- Check wallet has enough ETH for gas
- Verify RPC URL is correct
- Ensure contract is deployed and funded
- Check Base Sepolia network status

### Webhook Issues

```bash
# Check webhook status
curl https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo

# Delete webhook (for local development)
curl https://api.telegram.org/bot<YOUR_TOKEN>/deleteWebhook
```

---

## Resources

- [Base Documentation](https://docs.base.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [viem Documentation](https://viem.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [Base](https://base.org) - Coinbase's L2 blockchain
- Powered by [Telegram](https://telegram.org) - Messaging platform
- AI parsing inspired by [Claude](https://anthropic.com) and [OpenAI](https://openai.com)
- UI styled with [TailwindCSS](https://tailwindcss.com)

---

## Contact

**Project Maintainer**: Your Name
**Email**: your.email@example.com
**Twitter**: [@YourHandle](https://twitter.com/YourHandle)
**Telegram**: [@YourTelegram](https://t.me/YourTelegram)

---

<div align="center">

**Built with ❤️ for the Base ecosystem**

*Making DeFi conversational, one chat at a time.*

[Try Basely](#quick-start) | [Report Bug](https://github.com/yourusername/basely/issues) | [Request Feature](https://github.com/yourusername/basely/issues)

</div>

# BASELY

> AI-Powered DeFi Telegram Assistant on Base Blockchain

[![Base](https://img.shields.io/badge/Base-Sepolia-0052FF?style=for-the-badge&logo=ethereum)](https://base.org)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Bot Status](https://img.shields.io/badge/Bot-LIVE%20%E2%9C%85-brightgreen?style=for-the-badge&logo=telegram)](https://t.me/BaselyCryptoBot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🤖 Try It NOW!

**Bot is LIVE on Telegram:** [@BaselyCryptoBot](https://t.me/BaselyCryptoBot)

```
Try these commands:
/start    - Get started with Basely
/balance  - Check your ETH & mockETH balance
/mocketh  - Claim 10 free mockETH tokens
/stake    - Stake ETH to earn rewards
/mystake  - View your staking info
```

**🎯 Built for Base Batches 002 Hackathon**

---

## What is Basely?

**Basely** is an AI-powered DeFi assistant that simplifies blockchain interactions through natural language commands on Telegram. Built on Base blockchain, it makes DeFi accessible to everyone—no technical knowledge required.

**🚀 Status:** Deployed and running 24/7 on Railway

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

## Smart Contracts (Base Sepolia)

### Deployed Contracts ✅

**StakingPool Contract:**
- **Address:** `0x814D00372212f2dfd98340e010fd74a485619fc2`
- **BaseScan:** [View Contract](https://sepolia.basescan.org/address/0x814D00372212f2dfd98340e010fd74a485619fc2)
- **Features:** ETH staking, time-based rewards, mockETH distribution

**MockETH Token Contract:**
- **Address:** `0xaa742F895CE3387935DfEa7eCA8414a2426FB183`
- **BaseScan:** [View Contract](https://sepolia.basescan.org/address/0xaa742F895CE3387935DfEa7eCA8414a2426FB183)
- **Features:** ERC-20 token, faucet (10 tokens per claim), staking rewards

### Deploy Your Own (Optional)

Want to deploy your own contracts? See [contracts/README.md](contracts/README.md) for:
- Foundry deployment scripts
- Contract configuration
- Testing instructions

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

### Current Deployment: Railway ✅

**Bot is deployed and running 24/7 on Railway!**

Want to deploy your own instance? See [RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md) for step-by-step guide.

**Quick Deploy:**
1. Fork this repo
2. Sign up at [Railway](https://railway.app)
3. Connect GitHub repo
4. Set environment variables
5. Deploy!

**Environment Variables Needed:**
```env
TELEGRAM_BOT_TOKEN=<your_bot_token>
WALLET_ADDRESS=<your_wallet>
PRIVATE_KEY=<your_private_key>
RPC_URL=https://sepolia.base.org
STAKING_POOL_ADDRESS=0x814D00372212f2dfd98340e010fd74a485619fc2
MOCK_ETH_ADDRESS=0xaa742F895CE3387935DfEa7eCA8414a2426FB183
```

Full guide: [RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md)

---

## Development Roadmap

### Phase 1: MVP ✅ (COMPLETED)
- [x] Telegram bot integration
- [x] Natural language command parsing
- [x] ETH staking on Base Sepolia
- [x] Balance checking
- [x] Staking pool smart contract
- [x] Railway deployment (24/7 uptime)
- [x] MockETH reward system
- [x] Live on Telegram: [@BaselyCryptoBot](https://t.me/BaselyCryptoBot)

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

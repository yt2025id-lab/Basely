# Basely - Complete Project Structure

## Overview

This document lists all files created for the Basely AI-powered DeFi Telegram Assistant project.

---

## File Tree

```
basely/
│
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variables template
├── README.md                       # Main project documentation
├── LICENSE                         # MIT License
├── PROJECT_STRUCTURE.md            # This file
│
├── app/                            # Next.js 14 App Router
│   ├── layout.tsx                  # Root layout with metadata
│   ├── page.tsx                    # Landing page component
│   ├── globals.css                 # Global CSS styles
│   └── api/
│       └── webhook/
│           └── route.ts            # Telegram webhook API endpoint
│
├── src/                            # Source code
│   ├── bot/
│   │   ├── index.ts                # Telegram bot entry point
│   │   └── handlers.ts             # Bot command handlers
│   └── ai/
│       └── commandParser.ts        # Natural language parser
│
├── lib/                            # Shared utilities
│   ├── config.ts                   # Environment configuration
│   ├── types.ts                    # TypeScript type definitions
│   ├── blockchain.ts               # Blockchain utilities (viem)
│   └── stakingPool.ts              # Staking contract interactions
│
└── contracts/                      # Solidity smart contracts
    ├── StakingPool.sol             # ETH staking pool contract
    └── README.md                   # Contract deployment guide
```

---

## File Descriptions

### Configuration Files

#### `package.json`
- Dependencies: Next.js, React, Telegraf, viem, dotenv
- Dev dependencies: TypeScript, ESLint, TailwindCSS
- Scripts: `dev`, `build`, `start`, `lint`, `bot`

#### `tsconfig.json`
- TypeScript compiler configuration
- Strict mode enabled
- Path aliases: `@/*` → `./`

#### `next.config.js`
- Next.js configuration
- Webpack externals for Telegraf compatibility

#### `tailwind.config.ts`
- TailwindCSS configuration
- Custom color schemes
- Content paths for purging

#### `.env.example`
- Template for environment variables
- Telegram bot token
- Base RPC URL
- Private key
- Contract addresses

---

### Application Files

#### `app/layout.tsx`
- Root layout component
- Metadata configuration
- Font loading (Inter)

#### `app/page.tsx`
- Landing page with hero section
- Feature cards
- How it works section
- Call-to-action

#### `app/globals.css`
- TailwindCSS imports
- CSS variables
- Global styles

#### `app/api/webhook/route.ts`
- Telegram webhook handler
- POST endpoint for updates
- GET endpoint for health check

---

### Bot Files

#### `src/bot/index.ts`
- Telegram bot initialization
- Command registration
- Polling/webhook configuration
- Graceful shutdown handling

#### `src/bot/handlers.ts`
- `/start` - Welcome message
- `/help` - Command list
- `/balance` - ETH balance
- `/stake` - Stake ETH
- `/unstake` - Unstake and claim
- `/rewards` - Check staking info
- Natural language message handler
- Error handling

---

### AI Files

#### `src/ai/commandParser.ts`
- Natural language intent parsing
- Rule-based command extraction
- Amount parsing (supports "0.1 ETH", "1.5", etc.)
- Token pair extraction for swaps
- Confidence scoring
- Suggestion generation
- Placeholder for AI API integration (Claude/OpenAI)

---

### Library Files

#### `lib/config.ts`
- Environment variable loading
- Configuration object
- Validation function

#### `lib/types.ts`
- TypeScript interfaces:
  - `UserContext`
  - `CommandIntent`
  - `TransactionResult`
  - `StakeInfo`
  - `TokenBalance`
  - `SwapQuote`
  - `BotCommand`
- Supported commands array

#### `lib/blockchain.ts`
- viem client creation (public & wallet)
- ETH balance checking
- Token balance retrieval
- Transaction sending
- Gas estimation
- Address formatting
- Address validation

#### `lib/stakingPool.ts`
- Stake ETH function
- Unstake ETH function
- Claim rewards function
- Get stake info
- Get total staked
- Get pool balance
- Format stake info for display
- Full contract ABI

---

### Smart Contracts

#### `contracts/StakingPool.sol`
- Solidity 0.8.20
- ETH staking pool
- Reward calculation (1% daily default)
- Stake, unstake, claim functions
- Owner controls (pause, reward rate)
- Emergency withdrawal
- Events for all actions

#### `contracts/README.md`
- Deployment guides (Remix, Hardhat, Foundry)
- Funding instructions
- Testing guide
- ABI information
- Security notes

---

### Documentation

#### `README.md`
- Project overview
- Quick start guide
- Installation instructions
- Usage examples
- Architecture explanation
- Deployment guide (Vercel)
- Webhook setup
- Development roadmap
- Testing instructions
- Security notes
- Troubleshooting
- Contributing guidelines

#### `LICENSE`
- MIT License
- Copyright 2024

---

## Key Technologies

### Frontend
- **Next.js 14**: App Router, Server Components
- **React 18**: UI components
- **TypeScript 5**: Type safety
- **TailwindCSS 3**: Utility-first styling

### Backend
- **Telegraf 4**: Telegram Bot API wrapper
- **Node.js**: Runtime environment
- **dotenv**: Environment variables

### Blockchain
- **viem 2**: Ethereum interactions
- **Solidity 0.8**: Smart contracts
- **Base Sepolia**: L2 testnet

### AI
- **Rule-based NLP**: Intent parsing
- **Extensible**: Claude/OpenAI integration ready

---

## Environment Variables Required

```env
TELEGRAM_BOT_TOKEN=              # From @BotFather
TELEGRAM_WEBHOOK_URL=            # For production (Vercel)
BASE_RPC_URL=                    # Base Sepolia RPC
CHAIN_ID=84532                   # Base Sepolia
PRIVATE_KEY=0x...                # Wallet private key
WALLET_ADDRESS=0x...             # Wallet address
STAKING_POOL_ADDRESS=0x...       # Deployed contract
WETH_ADDRESS=0x4200...0006       # WETH on Base
ANTHROPIC_API_KEY=               # Optional (AI)
OPENAI_API_KEY=                  # Optional (AI)
NODE_ENV=development             # Environment
NEXT_PUBLIC_APP_URL=             # App URL
ENABLE_RATE_LIMITING=true        # Security
RATE_LIMIT_MAX=10                # Requests/min
LOG_LEVEL=info                   # Logging
DEBUG=false                      # Debug mode
```

---

## NPM Scripts

```bash
npm run dev       # Start Next.js dev server (http://localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run bot       # Start Telegram bot (polling mode)
```

---

## Development Workflow

1. **Setup**: Copy `.env.example` to `.env` and fill in values
2. **Install**: `npm install`
3. **Deploy Contract**: Follow `contracts/README.md`
4. **Run Bot**: `npm run bot` (development)
5. **Run Web**: `npm run dev` (landing page)
6. **Test**: Chat with bot on Telegram
7. **Deploy**: `vercel` (production)
8. **Set Webhook**: Use Telegram API to set webhook URL

---

## Architecture Flow

```
User (Telegram)
    ↓
Telegram Bot API
    ↓
Telegraf.js (src/bot/index.ts)
    ↓
Command Handlers (src/bot/handlers.ts)
    ↓
AI Parser (src/ai/commandParser.ts)
    ↓
Blockchain Utils (lib/blockchain.ts, lib/stakingPool.ts)
    ↓
viem Client
    ↓
Base Sepolia L2
    ↓
StakingPool Contract (contracts/StakingPool.sol)
```

---

## Deployment Checklist

- [ ] Create Telegram bot via @BotFather
- [ ] Get Base Sepolia testnet ETH
- [ ] Deploy StakingPool contract
- [ ] Fund contract with rewards
- [ ] Configure `.env` file
- [ ] Install dependencies (`npm install`)
- [ ] Test bot locally (`npm run bot`)
- [ ] Deploy to Vercel (`vercel`)
- [ ] Set environment variables in Vercel
- [ ] Set Telegram webhook to Vercel URL
- [ ] Test bot in production
- [ ] Monitor logs and errors

---

## Security Considerations

**CRITICAL**:
- Never commit `.env` to Git
- Use testnet wallet only
- Contract NOT audited
- Single wallet architecture (demo only)
- No user wallet management
- No transaction confirmation UI

**For Production**:
- Security audit required
- Multi-user wallet system
- Transaction approval flow
- Rate limiting
- Input validation
- Error handling
- Logging and monitoring

---

## Future Enhancements

### Phase 1 (Complete)
- ✅ Telegram bot integration
- ✅ Natural language parsing
- ✅ ETH staking
- ✅ Balance checking
- ✅ Staking pool contract
- ✅ Landing page

### Phase 2 (Planned)
- [ ] Token swapping (Uniswap)
- [ ] Yield farming pools
- [ ] Multi-token support
- [ ] Transaction history
- [ ] Price alerts

### Phase 3 (Future)
- [ ] Claude/OpenAI AI integration
- [ ] Advanced intent recognition
- [ ] Multi-step strategies
- [ ] Portfolio optimization

### Phase 4 (Production)
- [ ] Base Mainnet deployment
- [ ] Security audit
- [ ] Gas optimization
- [ ] Multi-chain support

---

## Support

For issues, questions, or contributions:
- GitHub Issues: Report bugs or request features
- Twitter: Follow for updates
- Telegram: Join community channel

---

**Last Updated**: December 2024
**Version**: 0.1.0 (MVP)
**License**: MIT

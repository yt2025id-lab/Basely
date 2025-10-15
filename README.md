# BASELY

**Your AI-Powered DeFi Telegram Buddy**

Basely is a Web3 hackathon project that brings AI-powered DeFi assistance directly to Telegram users.

## Features

- AI-powered chat interface
- DeFi protocol integration
- Telegram bot functionality
- Real-time blockchain data
- Smart contract interactions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Telegram Bot Token (for bot functionality)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
basely/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Third-party integrations and utilities
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── public/          # Static assets
└── .env.local       # Environment variables (not committed)
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with dark mode
- **Bot Platform**: Telegram Bot API
- **AI**: OpenAI / Anthropic APIs
- **Web3**: ethers.js / web3.js

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This is a hackathon project. Feel free to fork and experiment!

## License

MIT

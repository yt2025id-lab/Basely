export default function Dashboard() {
  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Basely Dashboard
          </h1>
          <p className="text-gray-400">
            Your AI-powered DeFi command center
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-purple/20 to-purple/5 border border-purple/30 rounded-lg p-6 hover:border-purple/50 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">
              Telegram Bot
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Connect your Telegram bot to start interacting with users
            </p>
            <div className="inline-flex items-center gap-2 text-purple text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Not Connected
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-pink/20 to-pink/5 border border-pink/30 rounded-lg p-6 hover:border-pink/50 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">
              AI Assistant
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Configure your AI model and conversation settings
            </p>
            <div className="inline-flex items-center gap-2 text-pink text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Pending Setup
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-cyan/20 to-cyan/5 border border-cyan/30 rounded-lg p-6 hover:border-cyan/50 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">
              Web3 Integration
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Connect to blockchain networks and smart contracts
            </p>
            <div className="inline-flex items-center gap-2 text-cyan text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Not Connected
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-gradient-to-r from-navy to-purple/10 border border-purple/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-purple">0</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Messages</p>
              <p className="text-3xl font-bold text-pink">0</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Transactions</p>
              <p className="text-3xl font-bold text-cyan">0</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Bots</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="mt-8 bg-navy/50 border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Getting Started
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-purple mt-1">→</span>
              <span>Configure your environment variables in .env.local</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink mt-1">→</span>
              <span>Set up your Telegram bot with @BotFather</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan mt-1">→</span>
              <span>Connect your AI provider (OpenAI or Anthropic)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white mt-1">→</span>
              <span>Add Web3 provider credentials (Infura or Alchemy)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

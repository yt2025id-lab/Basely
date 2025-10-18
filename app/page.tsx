/**
 * Landing page for Basely
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Basely
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            AI-Powered DeFi Assistant on Base
          </p>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Simplify DeFi operations with natural language commands through Telegram.
            Stake, swap, and farm yields effortlessly on Base blockchain.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Easy Staking</h3>
            <p className="text-purple-200">
              Stake ETH and earn rewards with simple commands like "Stake 0.1 ETH"
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
            <p className="text-purple-200">
              Natural language processing understands your DeFi intents automatically
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Base Network</h3>
            <p className="text-purple-200">
              Fast, low-cost transactions on Coinbase's L2 blockchain
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                1
              </div>
              <p className="text-purple-200">Start a chat with Basely bot on Telegram</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                2
              </div>
              <p className="text-purple-200">Tell it what you want to do in plain English</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                3
              </div>
              <p className="text-purple-200">AI understands and executes your DeFi action</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                4
              </div>
              <p className="text-purple-200">Get instant confirmation and results</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://t.me/YOUR_BOT_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Start Using Basely on Telegram
          </a>
          <p className="text-purple-300 mt-4">
            Available on Base Sepolia Testnet
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-purple-300">
          <p className="mb-2">Open Source | MIT License</p>
          <a
            href="https://github.com/yourusername/basely"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            View on GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}

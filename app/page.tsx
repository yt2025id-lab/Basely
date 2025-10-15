import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-navy via-purple/20 to-navy">
      <div className="z-10 w-full max-w-5xl">
        <div className="text-center">
          {/* Logo/Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent animate-pulse">
            BASELY
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Welcome to Basely
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Your AI-Powered DeFi Telegram Buddy – Bringing intelligent blockchain interactions to your fingertips
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple to-pink hover:from-purple/80 hover:to-pink/80 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple/50"
            >
              Go to Dashboard →
            </Link>
            <a
              href="https://github.com/yourusername/basely"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-navy/80 border-2 border-cyan hover:bg-cyan/10 hover:border-cyan/80 text-white rounded-lg font-semibold transition-all"
            >
              Learn More
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gradient-to-br from-purple/10 to-transparent border border-purple/30 rounded-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">
                Leveraging advanced AI to understand and execute DeFi operations
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink/10 to-transparent border border-pink/30 rounded-lg">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Telegram Native</h3>
              <p className="text-gray-400 text-sm">
                Seamlessly interact with DeFi protocols through Telegram
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/30 rounded-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Web3 Ready</h3>
              <p className="text-gray-400 text-sm">
                Built for the decentralized future with full blockchain integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

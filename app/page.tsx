"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);

  const handleTelegramDemo = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 overflow-hidden bg-navy">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-purple/10 to-navy"></div>

      {/* Alert notification */}
      {showAlert && (
        <div className="fixed top-8 right-8 z-50 bg-gradient-to-r from-purple to-pink px-6 py-4 rounded-lg box-glow-purple animate-pulse fade-in">
          <p className="text-white font-semibold">🤖 Telegram Bot Demo Coming Soon!</p>
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-6xl fade-in">
        <div className="text-center">
          {/* Main title with whale logo and breathing neon glow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent neon-pulse">
              BASELY
            </h1>
            {/* Rotating and floating whale */}
            <div className="text-7xl md:text-9xl rotate float">
              🐋
            </div>
          </div>

          {/* Subtitle with slide-in animation and soft glow */}
          <p className="text-2xl md:text-3xl text-cyan-300 neon-glow-cyan text-center mb-4">
            Your AI-powered DeFi Telegram Buddy 🚀
          </p>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-center fade-in">
            Experience the future of decentralized finance with intelligent AI assistance,
            seamless Telegram integration, and Web3 superpowers
          </p>

          {/* CTA Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/dashboard"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple to-pink hover:from-purple/90 hover:to-pink/90 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 box-glow-purple ring-pulse-hover overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="wiggle-hover inline-block">🚀</span>
                Launch Dashboard
              </span>
            </Link>

            <button
              onClick={handleTelegramDemo}
              className="group relative px-10 py-5 bg-navy/80 border-2 border-cyan hover:bg-cyan/10 hover:border-cyan/80 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 ring-pulse-hover"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="wiggle-hover inline-block">📱</span>
                Try Telegram Demo
              </span>
            </button>
          </div>

          {/* Feature highlights with enhanced animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* AI-Powered */}
            <div className="group p-8 bg-gradient-to-br from-purple/20 to-transparent border border-purple/30 rounded-2xl hover:border-purple hover:box-glow-purple transition-all duration-300 tilt-hover">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform float">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 neon-glow-purple">
                AI-Powered
              </h3>
              <p className="text-gray-400">
                Advanced AI understands your DeFi needs and executes complex operations with simple commands
              </p>
            </div>

            {/* Telegram Native */}
            <div className="group p-8 bg-gradient-to-br from-pink/20 to-transparent border border-pink/30 rounded-2xl hover:border-pink hover:box-glow-pink transition-all duration-300 tilt-hover">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform float" style={{ animationDelay: "1s" }}>
                💬
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 neon-glow-pink">
                Telegram Native
              </h3>
              <p className="text-gray-400">
                Interact with DeFi protocols seamlessly through your favorite messaging app
              </p>
            </div>

            {/* Web3 Ready */}
            <div className="group p-8 bg-gradient-to-br from-cyan/20 to-transparent border border-cyan/30 rounded-2xl hover:border-cyan hover:box-glow-cyan transition-all duration-300 tilt-hover">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform float" style={{ animationDelay: "2s" }}>
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 neon-glow-cyan">
                Web3 Ready
              </h3>
              <p className="text-gray-400">
                Built for the decentralized future with full blockchain integration and smart contract support
              </p>
            </div>
          </div>

          {/* Stats banner with pulsing animations */}
          <div className="mt-16 p-6 bg-gradient-to-r from-purple/10 via-pink/10 to-cyan/10 border border-purple/20 rounded-xl border-glow-animate">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="fade-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-3xl font-bold text-purple neon-glow-purple">24/7</p>
                <p className="text-sm text-gray-400 mt-1">AI Assistance</p>
              </div>
              <div className="fade-in" style={{ animationDelay: "0.2s" }}>
                <p className="text-3xl font-bold text-pink neon-glow-pink">10+</p>
                <p className="text-sm text-gray-400 mt-1">DeFi Protocols</p>
              </div>
              <div className="fade-in" style={{ animationDelay: "0.3s" }}>
                <p className="text-3xl font-bold text-cyan neon-glow-cyan">Instant</p>
                <p className="text-sm text-gray-400 mt-1">Transactions</p>
              </div>
              <div className="fade-in" style={{ animationDelay: "0.4s" }}>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-sm text-gray-400 mt-1">Decentralized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

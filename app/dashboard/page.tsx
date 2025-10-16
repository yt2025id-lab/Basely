"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dashboard() {
  // Typing animation state for tagline
  const [typedTagline, setTypedTagline] = useState("");
  const [isTaglineComplete, setIsTaglineComplete] = useState(false);
  const fullTagline = "Complexity was the bug. Conversation is the fix.";

  // Wallet state
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const targetSol = useRef(3.21);
  const targetUsdc = useRef(102.5);

  // Swap state
  const [swapFrom, setSwapFrom] = useState("SOL");
  const [swapTo, setSwapTo] = useState("USDC");
  const [swapAmount, setSwapAmount] = useState("");
  const [swapResult, setSwapResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { user: "You", message: "Show my SOL balance", time: "2m ago" },
    { user: "Basely Bot", message: "Your balance: 3.21 SOL ✅", time: "2m ago" },
    { user: "You", message: "What's the best yield farm?", time: "1m ago" },
    { user: "Basely Bot", message: "SOL Pool offers 12.3% APY 🔥", time: "1m ago" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Demo mode state
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoLog, setDemoLog] = useState<string[]>([]);
  const [isDemoBoxVisible, setIsDemoBoxVisible] = useState(true);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Typing animation for tagline
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullTagline.length) {
        setTypedTagline(fullTagline.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTaglineComplete(true);
        clearInterval(typingInterval);
      }
    }, 60); // 60ms per character

    return () => clearInterval(typingInterval);
  }, []);

  // Count-up animation for balances
  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 60;
    const solIncrement = targetSol.current / steps;
    const usdcIncrement = targetUsdc.current / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setSolBalance(Number((solIncrement * currentStep).toFixed(2)));
        setUsdcBalance(Number((usdcIncrement * currentStep).toFixed(2)));
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Auto-scroll demo log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [demoLog]);

  const refreshBalances = () => {
    setIsRefreshing(true);

    // Generate new random balances (±10%)
    const newSol = Number((targetSol.current * (0.9 + Math.random() * 0.2)).toFixed(2));
    const newUsdc = Number((targetUsdc.current * (0.9 + Math.random() * 0.2)).toFixed(2));

    targetSol.current = newSol;
    targetUsdc.current = newUsdc;

    // Animate count-up
    const duration = 800;
    const steps = 40;
    const solStart = solBalance;
    const usdcStart = usdcBalance;
    const solDiff = newSol - solStart;
    const usdcDiff = newUsdc - usdcStart;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setSolBalance(Number((solStart + (solDiff / steps) * currentStep).toFixed(2)));
        setUsdcBalance(Number((usdcStart + (usdcDiff / steps) * currentStep).toFixed(2)));
      } else {
        clearInterval(timer);
        setIsRefreshing(false);
      }
    }, duration / steps);
  };

  const handleSwap = () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      setSwapResult("❌ Please enter a valid amount");
      setTimeout(() => setSwapResult(""), 3000);
      return;
    }

    setIsProcessing(true);
    setSwapResult("");

    // Show processing state for 1 second
    setTimeout(() => {
      const amount = parseFloat(swapAmount);
      let result = "";

      if (swapFrom === "SOL" && swapTo === "USDC") {
        const received = (amount * 20.3).toFixed(2);
        result = `✅ Swapped ${amount} SOL = ${received} USDC`;
      } else if (swapFrom === "USDC" && swapTo === "SOL") {
        const received = (amount / 20.3).toFixed(3);
        result = `✅ Swapped ${amount} USDC = ${received} SOL`;
      } else {
        result = `✅ Swapped ${amount} ${swapFrom} to ${swapTo}`;
      }

      setSwapResult(result);
      setIsProcessing(false);
      setTimeout(() => setSwapResult(""), 5000);
    }, 1000);
  };

  const swapTokens = () => {
    const temp = swapFrom;
    setSwapFrom(swapTo);
    setSwapTo(temp);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const newMsg = {
      user: "You",
      message: message,
      time: "Now",
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Show typing indicator
    setIsTyping(true);

    // Bot responds after 1 second
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        "I'm processing your request... 🤖",
        "Your transaction is pending ⏳",
        "Balance updated successfully! ✅",
        "Let me check that for you... 🔍",
        "Great question! Here's what I found 💡",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      setChatMessages((prev) => [
        ...prev,
        {
          user: "Basely Bot",
          message: randomResponse,
          time: "Now",
        },
      ]);
    }, 1000);
  };

  // Auto Demo Mode - Orchestrates all interactions with activity log
  const startDemo = async () => {
    if (isDemoRunning) return;

    setIsDemoRunning(true);
    setIsDemoBoxVisible(true);
    setDemoLog(["🎬 Starting demo sequence..."]);
    setDemoStep(0);

    // Clear existing hide timeout if any
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Step 1: Refresh wallet balances
    await new Promise(r => setTimeout(r, 500));
    setDemoLog(prev => [...prev, "🔄 Refreshing wallet balances..."]);
    setDemoStep(1);
    refreshBalances();
    await new Promise(r => setTimeout(r, 1500));

    // Step 2: Simulate token swap
    setDemoLog(prev => [...prev, "💱 Simulating token swap (1.5 SOL → USDC)..."]);
    setDemoStep(2);
    setSwapAmount("1.5");
    setSwapFrom("SOL");
    setSwapTo("USDC");
    handleSwap();
    await new Promise(r => setTimeout(r, 2000));

    // Step 3: Display yield pools
    setDemoLog(prev => [...prev, "📊 Highlighting yield farming opportunities..."]);
    setDemoStep(3);
    await new Promise(r => setTimeout(r, 1500));

    // Step 4: Chat simulation - First message
    setDemoLog(prev => [...prev, "💬 Running AI chat simulation..."]);
    setDemoStep(4);
    handleSendMessage("What's my portfolio value?");
    await new Promise(r => setTimeout(r, 2500));

    // Step 5: Chat simulation - Second message
    setDemoLog(prev => [...prev, "🤖 Continuing conversation..."]);
    handleSendMessage("Show me the best yield farms");
    await new Promise(r => setTimeout(r, 2500));

    // Demo complete
    setDemoLog(prev => [...prev, "✅ Demo sequence complete!"]);
    setDemoStep(0);

    // Keep demo running state for 2 more seconds to show completion
    await new Promise(r => setTimeout(r, 2000));
    setIsDemoRunning(false);

    // Auto-hide after 8 seconds with fade out
    hideTimeoutRef.current = setTimeout(() => {
      setIsDemoBoxVisible(false);
    }, 8000);
  };

  // Cleanup demo timeout on unmount
  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy p-4 md:p-8">
      {/* Demo Mode Indicator & Activity Log - Bottom Right Corner */}
      {isDemoRunning && isDemoBoxVisible && (
        <div
          className="fixed bottom-6 right-6 z-50 transition-all duration-700"
          style={{
            opacity: isDemoBoxVisible ? 1 : 0,
            transform: isDemoBoxVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div
            className="border rounded-xl p-3 shadow-2xl"
            style={{
              background: 'rgba(17, 17, 25, 0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              width: '224px', // ~30% smaller than 320px (w-80)
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple/30">
              <span className="text-xl animate-pulse">🎬</span>
              <div>
                <p className="text-white font-bold text-sm">Auto Demo Running</p>
                <p className="text-cyan-300 text-xs neon-glow-cyan">Live Activity Feed</p>
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1.5">
              {demoLog.map((log, idx) => (
                <div
                  key={idx}
                  className="bg-navy/60 border border-purple/20 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent hover:opacity-80 transition-opacity neon-pulse"
            >
              ← BASELY
            </Link>
            {/* Typing tagline */}
            <div className="mt-2 text-2xl md:text-3xl text-cyan-300 neon-clear text-center">
              <p className={!isTaglineComplete ? "typing-cursor" : ""}>
                {typedTagline}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Demo Control Button */}
            <button
              onClick={startDemo}
              disabled={isDemoRunning}
              className="px-6 py-3 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-lg hover:scale-105 transition-all shadow-lg box-glow-pink disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="text-xl">{isDemoRunning ? "⏳" : "🎬"}</span>
              {isDemoRunning ? "Demo Running..." : "Start Demo"}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Wallet Overview with animated numbers */}
        <div
          className={`bg-gradient-to-br from-purple/20 to-transparent border rounded-2xl p-6 hover:border-purple hover:box-glow-purple transition-all duration-300 ${
            isRefreshing || demoStep === 1 ? "border-glow-animate border-purple box-glow-purple" : "border-purple/30"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white neon-glow-purple">💼 Wallet Overview</h2>
            <button
              onClick={refreshBalances}
              className={`p-2 bg-purple/20 hover:bg-purple/40 rounded-lg transition-all ${
                isRefreshing ? "animate-spin" : ""
              }`}
              title="Refresh balances"
              disabled={isRefreshing}
            >
              <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-navy/50 border border-purple/20 rounded-xl p-4 slide-in">
              <p className="text-gray-400 text-sm mb-1">User</p>
              <p className="text-white text-lg font-semibold">Fauzan (demo)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple/10 to-transparent border border-purple/30 rounded-xl p-4 hover:scale-105 transition-transform fade-in">
                <p className="text-gray-400 text-sm mb-2">SOL Balance</p>
                <p className="text-3xl font-bold text-purple neon-glow-purple">{solBalance}</p>
                <p className="text-gray-500 text-xs mt-1">◎ Solana</p>
              </div>

              <div className="bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/30 rounded-xl p-4 hover:scale-105 transition-transform fade-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-gray-400 text-sm mb-2">USDC Balance</p>
                <p className="text-3xl font-bold text-cyan neon-glow-cyan">{usdcBalance}</p>
                <p className="text-gray-500 text-xs mt-1">$ USD Coin</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple/5 to-pink/5 border border-pink/20 rounded-xl p-3 fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-gray-400 text-xs">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-pink neon-glow-pink">
                ${(solBalance * 20.3 + usdcBalance).toFixed(2)} USD
              </p>
            </div>
          </div>
        </div>

        {/* 2. Swap Simulator with processing state */}
        <div className={`bg-gradient-to-br from-pink/20 to-transparent border rounded-2xl p-6 hover:border-pink hover:box-glow-pink transition-all duration-300 ${
          demoStep === 2 ? "border-glow-animate border-pink box-glow-pink" : "border-pink/30"
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 neon-glow-pink">🔄 Swap Simulator</h2>

          <div className="space-y-4">
            {/* From */}
            <div className="bg-navy/50 border border-pink/20 rounded-xl p-4">
              <label className="text-gray-400 text-sm mb-2 block">From</label>
              <div className="flex gap-3">
                <select
                  value={swapFrom}
                  onChange={(e) => setSwapFrom(e.target.value)}
                  className="flex-1 bg-navy border border-pink/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-pink transition-all"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-navy border border-pink/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-pink transition-all"
                />
              </div>
            </div>

            {/* Swap direction button */}
            <div className="flex justify-center">
              <button
                onClick={swapTokens}
                className="p-3 bg-pink/20 hover:bg-pink/40 rounded-full transition-all transform hover:rotate-180 duration-300"
              >
                <svg className="w-6 h-6 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To */}
            <div className="bg-navy/50 border border-pink/20 rounded-xl p-4">
              <label className="text-gray-400 text-sm mb-2 block">To</label>
              <select
                value={swapTo}
                onChange={(e) => setSwapTo(e.target.value)}
                className="w-full bg-navy border border-pink/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-pink transition-all"
              >
                <option value="SOL">SOL</option>
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
              </select>
            </div>

            {/* Swap button */}
            <button
              onClick={handleSwap}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-pink to-purple hover:from-pink/80 hover:to-purple/80 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 box-glow-pink disabled:opacity-50 disabled:cursor-not-allowed ring-pulse-hover"
            >
              {isProcessing ? "Processing..." : "Simulate Swap"}
            </button>

            {/* Processing state */}
            {isProcessing && (
              <div className="bg-gradient-to-r from-purple/20 to-pink/20 border border-pink/40 rounded-xl p-4 border-glow-animate">
                <p className="text-white font-semibold text-center flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing swap...
                </p>
              </div>
            )}

            {/* Result */}
            {swapResult && !isProcessing && (
              <div className="bg-gradient-to-r from-purple/20 to-pink/20 border border-pink/40 rounded-xl p-4 animate-pulse fade-in">
                <p className="text-white font-semibold text-center">{swapResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Yield Farming with hover tilt */}
        <div className={`bg-gradient-to-br from-cyan/20 to-transparent border rounded-2xl p-6 hover:border-cyan hover:box-glow-cyan transition-all duration-300 ${
          demoStep === 3 ? "border-glow-animate border-cyan box-glow-cyan" : "border-cyan/30"
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 neon-glow-cyan">🌾 Yield Farming</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SOL Pool */}
            <div className="group bg-gradient-to-br from-purple/10 to-transparent border border-purple/30 rounded-xl p-5 hover:border-purple hover:box-glow-purple transition-all duration-300 cursor-pointer tilt-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl float">◎</div>
                <div className="px-3 py-1 bg-purple/20 rounded-full">
                  <span className="text-purple text-sm font-bold">HOT 🔥</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">SOL Pool</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-4xl font-bold text-purple neon-glow-purple">12.3%</p>
                <p className="text-gray-400 text-sm">APY</p>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Stake your SOL and earn high yields
              </p>
              <button className="w-full bg-purple/20 hover:bg-purple/40 text-purple font-semibold py-2 rounded-lg transition-all group-hover:scale-105">
                Stake Now
              </button>
            </div>

            {/* USDC Pool */}
            <div className="group bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/30 rounded-xl p-5 hover:border-cyan hover:box-glow-cyan transition-all duration-300 cursor-pointer tilt-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl float" style={{ animationDelay: "1s" }}>💵</div>
                <div className="px-3 py-1 bg-cyan/20 rounded-full">
                  <span className="text-cyan text-sm font-bold">Stable</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">USDC Pool</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-4xl font-bold text-cyan neon-glow-cyan">7.1%</p>
                <p className="text-gray-400 text-sm">APY</p>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Low-risk stablecoin farming
              </p>
              <button className="w-full bg-cyan/20 hover:bg-cyan/40 text-cyan font-semibold py-2 rounded-lg transition-all group-hover:scale-105">
                Stake Now
              </button>
            </div>
          </div>

          <div className="mt-4 bg-navy/50 border border-cyan/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Total Value Locked (TVL)</p>
            <p className="text-2xl font-bold text-cyan neon-glow-cyan">$24.8M</p>
          </div>
        </div>

        {/* 4. Bot Chat with typing indicator and auto-scroll */}
        <div className={`bg-gradient-to-br from-purple/20 via-pink/10 to-cyan/20 border rounded-2xl p-6 hover:border-pink hover:box-glow-purple transition-all duration-300 ${
          demoStep === 3 || demoStep === 4 ? "border-glow-animate border-cyan box-glow-cyan" : "border-purple/30"
        }`}>
          <h2 className="text-2xl font-bold text-white mb-6 neon-glow-pink">💬 Telegram Chat Demo</h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl fade-in ${
                  msg.user === "You"
                    ? "bg-purple/20 border border-purple/30 ml-8"
                    : "bg-cyan/20 border border-cyan/30 mr-8"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-semibold text-sm ${msg.user === "You" ? "text-purple" : "text-cyan"}`}>
                    {msg.user}
                  </p>
                  <p className="text-gray-500 text-xs">{msg.time}</p>
                </div>
                <p className="text-white text-sm">{msg.message}</p>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="p-3 rounded-xl bg-cyan/20 border border-cyan/30 mr-8 fade-in">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-cyan">Basely Bot</p>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
                <p className="text-white text-sm">is thinking...</p>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-navy/50 border border-pink/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-pink transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  handleSendMessage(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input.value) {
                  handleSendMessage(input.value);
                  input.value = "";
                }
              }}
              className="px-6 bg-gradient-to-r from-pink to-purple hover:from-pink/80 hover:to-purple/80 text-white font-bold rounded-lg transition-all ring-pulse-hover"
            >
              Send
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">⚡ Connected to Telegram Bot API (demo mode)</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="max-w-7xl mx-auto mt-6 fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="bg-gradient-to-r from-navy/80 to-purple/10 border border-purple/20 rounded-2xl p-6 border-glow-animate">
          <h2 className="text-xl font-bold text-white mb-4">📊 Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-navy/50 rounded-lg border border-purple/10 hover:border-purple/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Wallet connected</span>
              </div>
              <span className="text-gray-500 text-sm">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-navy/50 rounded-lg border border-cyan/10 hover:border-cyan/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Balance updated</span>
              </div>
              <span className="text-gray-500 text-sm">12 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-navy/50 rounded-lg border border-pink/10 hover:border-pink/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Telegram bot initialized</span>
              </div>
              <span className="text-gray-500 text-sm">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

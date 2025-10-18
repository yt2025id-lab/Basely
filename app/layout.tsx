import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basely - AI-Powered DeFi Telegram Assistant",
  description: "Simplify DeFi on Base blockchain with natural language commands via Telegram",
  keywords: ["DeFi", "Base", "Telegram", "AI", "Blockchain", "Ethereum", "Staking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

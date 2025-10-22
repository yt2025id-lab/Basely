/**
 * Blockchain utilities for interacting with Base network
 * Uses viem for Ethereum interactions
 */

import { createPublicClient, createWalletClient, http, parseEther, formatEther } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { config } from './config';
import type { TokenBalance } from './types';

/**
 * Get public client for reading blockchain data
 */
export function getPublicClient() {
  return createPublicClient({
    chain: baseSepolia,
    transport: http(config.blockchain.rpcUrl),
  });
}

/**
 * Get wallet client for signing transactions
 */
export function getWalletClient() {
  const account = privateKeyToAccount(config.blockchain.privateKey);

  return createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(config.blockchain.rpcUrl),
  });
}

/**
 * Get account from private key
 */
export function getAccount() {
  return privateKeyToAccount(config.blockchain.privateKey);
}

/**
 * Get ETH balance for an address
 * @param address Ethereum address
 * @returns Balance in ETH
 */
export async function getETHBalance(address: `0x${string}`): Promise<string> {
  try {
    const publicClient = getPublicClient();
    const balance = await publicClient.getBalance({ address });
    return formatEther(balance);
  } catch (error) {
    console.error('Error getting ETH balance:', error);
    throw new Error('Failed to get ETH balance');
  }
}

/**
 * Get token balance for an address
 * @param tokenAddress Token contract address
 * @param walletAddress Wallet address
 * @returns Token balance information
 */
export async function getTokenBalance(
  tokenAddress: `0x${string}`,
  walletAddress: `0x${string}`
): Promise<TokenBalance> {
  try {
    const publicClient = getPublicClient();

    // ERC20 ABI for balanceOf and decimals
    const erc20Abi = [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
      },
      {
        name: 'decimals',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint8' }],
      },
      {
        name: 'symbol',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'string' }],
      },
    ] as const;

    const [balance, decimals, symbol] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [walletAddress],
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'symbol',
      }),
    ]);

    const balanceFormatted = Number(balance) / Math.pow(10, decimals);

    return {
      symbol: symbol as string,
      balance: balanceFormatted.toString(),
      decimals: decimals as number,
      address: tokenAddress,
    };
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to get token balance');
  }
}

/**
 * Send ETH transaction
 * @param to Recipient address
 * @param amount Amount in ETH
 * @returns Transaction hash
 */
export async function sendETH(to: `0x${string}`, amount: string): Promise<string> {
  try {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();

    const hash = await walletClient.sendTransaction({
      to,
      value: parseEther(amount),
    });

    // Wait for transaction confirmation
    await publicClient.waitForTransactionReceipt({ hash });

    return hash;
  } catch (error) {
    console.error('Error sending ETH:', error);
    throw new Error('Failed to send ETH transaction');
  }
}

/**
 * Estimate gas for a transaction
 * @param to Contract address
 * @param data Transaction data
 * @param value ETH value (optional)
 * @returns Gas estimate
 */
export async function estimateGas(
  to: `0x${string}`,
  data: `0x${string}`,
  value?: bigint
): Promise<bigint> {
  try {
    const publicClient = getPublicClient();
    const account = getAccount();

    const gasEstimate = await publicClient.estimateGas({
      account,
      to,
      data,
      value,
    });

    return gasEstimate;
  } catch (error) {
    console.error('Error estimating gas:', error);
    throw new Error('Failed to estimate gas');
  }
}

/**
 * Get current gas price
 * @returns Gas price in gwei
 */
export async function getGasPrice(): Promise<bigint> {
  try {
    const publicClient = getPublicClient();
    const gasPrice = await publicClient.getGasPrice();
    return gasPrice;
  } catch (error) {
    console.error('Error getting gas price:', error);
    throw new Error('Failed to get gas price');
  }
}

/**
 * Get transaction receipt
 * @param hash Transaction hash
 * @returns Transaction receipt
 */
export async function getTransactionReceipt(hash: `0x${string}`) {
  try {
    const publicClient = getPublicClient();
    const receipt = await publicClient.getTransactionReceipt({ hash });
    return receipt;
  } catch (error) {
    console.error('Error getting transaction receipt:', error);
    throw new Error('Failed to get transaction receipt');
  }
}

/**
 * Format address for display (shorten)
 * @param address Ethereum address
 * @returns Shortened address
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Validate Ethereum address
 * @param address Address to validate
 * @returns True if valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

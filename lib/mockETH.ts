/**
 * MockETH token interaction utilities
 * Handles MockETH balance checks, faucet claims, and transfers
 */

import { formatEther } from 'viem';
import { getPublicClient, getWalletClient, getAccount } from './blockchain';
import { config } from './config';
import type { TransactionResult } from './types';

// MockETH contract ABI
const MOCK_ETH_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'faucet',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

/**
 * Get MockETH balance for an address
 * @param address Wallet address
 * @returns Balance in MockETH
 */
export async function getMockETHBalance(address: `0x${string}`): Promise<string> {
  try {
    const publicClient = getPublicClient();

    const balance = await publicClient.readContract({
      address: config.contracts.mockETH,
      abi: MOCK_ETH_ABI,
      functionName: 'balanceOf',
      args: [address],
    });

    return formatEther(balance as bigint);
  } catch (error) {
    console.error('Error getting MockETH balance:', error);
    throw new Error('Failed to get MockETH balance');
  }
}

/**
 * Claim free MockETH from faucet (10 mockETH)
 * @returns Transaction result
 */
export async function claimMockETHFaucet(): Promise<TransactionResult> {
  try {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();
    const account = getAccount();

    console.log('Claiming 10 mockETH from faucet...');

    // Send faucet claim transaction
    const hash = await walletClient.writeContract({
      address: config.contracts.mockETH,
      abi: MOCK_ETH_ABI,
      functionName: 'faucet',
      account,
    });

    console.log(`Transaction sent: ${hash}`);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === 'success') {
      return {
        success: true,
        transactionHash: hash,
        message: `Successfully claimed 10 mockETH from faucet! 🎉\n\n` +
          `Transaction: ${hash}\n` +
          `View on BaseScan: https://sepolia.basescan.org/tx/${hash}`,
      };
    } else {
      return {
        success: false,
        transactionHash: hash,
        error: 'Transaction failed',
        message: 'Failed to claim mockETH. Transaction reverted.',
      };
    }
  } catch (error: any) {
    console.error('Error claiming mockETH:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      message: `Failed to claim mockETH: ${error.message || 'Unknown error'}`,
    };
  }
}

/**
 * Get MockETH token info
 * @returns Token information
 */
export async function getMockETHInfo() {
  try {
    const publicClient = getPublicClient();

    const [name, symbol, decimals] = await Promise.all([
      publicClient.readContract({
        address: config.contracts.mockETH,
        abi: MOCK_ETH_ABI,
        functionName: 'name',
      }),
      publicClient.readContract({
        address: config.contracts.mockETH,
        abi: MOCK_ETH_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: config.contracts.mockETH,
        abi: MOCK_ETH_ABI,
        functionName: 'decimals',
      }),
    ]);

    return {
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
      address: config.contracts.mockETH,
    };
  } catch (error) {
    console.error('Error getting MockETH info:', error);
    throw new Error('Failed to get MockETH information');
  }
}

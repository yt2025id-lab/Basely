/**
 * StakingPool contract interaction utilities
 * Handles staking, unstaking, and reward claiming
 */

import { parseEther, formatEther } from 'viem';
import { getPublicClient, getWalletClient, getAccount } from './blockchain';
import { config } from './config';
import type { StakeInfo, TransactionResult } from './types';

// StakingPool contract ABI (Updated for MockETH rewards)
const STAKING_POOL_ABI = [
  {
    name: 'stake',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'unstake',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'claimReward',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'stakes',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'rewardDebt', type: 'uint256' },
    ],
  },
  {
    name: 'calculateReward',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalStaked',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getRewardBalance',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getStakedBalance',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'mockETH',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
] as const;

/**
 * Stake ETH into the staking pool
 * @param amount Amount of ETH to stake
 * @returns Transaction result
 */
export async function stakeETH(amount: string): Promise<TransactionResult> {
  try {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();
    const account = getAccount();

    console.log(`Staking ${amount} ETH to pool at ${config.contracts.stakingPool}`);

    // Send stake transaction
    const hash = await walletClient.writeContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'stake',
      value: parseEther(amount),
      account,
    });

    console.log(`Transaction sent: ${hash}`);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === 'success') {
      return {
        success: true,
        transactionHash: hash,
        message: `Successfully staked ${amount} ETH! 🎉\n\nTransaction: ${hash}`,
      };
    } else {
      return {
        success: false,
        transactionHash: hash,
        error: 'Transaction failed',
        message: 'Failed to stake ETH. Transaction reverted.',
      };
    }
  } catch (error: any) {
    console.error('Error staking ETH:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      message: `Failed to stake ETH: ${error.message || 'Unknown error'}`,
    };
  }
}

/**
 * Unstake all ETH and claim rewards
 * @returns Transaction result
 */
export async function unstakeETH(): Promise<TransactionResult> {
  try {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();
    const account = getAccount();

    console.log('Unstaking ETH from pool...');

    // Send unstake transaction
    const hash = await walletClient.writeContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'unstake',
      account,
    });

    console.log(`Transaction sent: ${hash}`);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === 'success') {
      return {
        success: true,
        transactionHash: hash,
        message: `Successfully unstaked your ETH and claimed mockETH rewards! 🎉\n\n` +
          `Transaction: ${hash}\n` +
          `View on BaseScan: https://sepolia.basescan.org/tx/${hash}`,
      };
    } else {
      return {
        success: false,
        transactionHash: hash,
        error: 'Transaction failed',
        message: 'Failed to unstake ETH. Transaction reverted.',
      };
    }
  } catch (error: any) {
    console.error('Error unstaking ETH:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      message: `Failed to unstake ETH: ${error.message || 'Unknown error'}`,
    };
  }
}

/**
 * Claim staking rewards without unstaking
 * @returns Transaction result
 */
export async function claimRewards(): Promise<TransactionResult> {
  try {
    const walletClient = getWalletClient();
    const publicClient = getPublicClient();
    const account = getAccount();

    console.log('Claiming rewards...');

    // Send claim transaction
    const hash = await walletClient.writeContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'claimReward',
      account,
    });

    console.log(`Transaction sent: ${hash}`);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status === 'success') {
      return {
        success: true,
        transactionHash: hash,
        message: `Successfully claimed your mockETH rewards! 🎉\n\n` +
          `Transaction: ${hash}\n` +
          `View on BaseScan: https://sepolia.basescan.org/tx/${hash}`,
      };
    } else {
      return {
        success: false,
        transactionHash: hash,
        error: 'Transaction failed',
        message: 'Failed to claim rewards. Transaction reverted.',
      };
    }
  } catch (error: any) {
    console.error('Error claiming rewards:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      message: `Failed to claim rewards: ${error.message || 'Unknown error'}`,
    };
  }
}

/**
 * Get stake information for a user
 * @param userAddress User's wallet address
 * @returns Stake information
 */
export async function getStakeInfo(userAddress: `0x${string}`): Promise<StakeInfo> {
  try {
    const publicClient = getPublicClient();

    // Get stake data from stakes mapping
    const [amount, timestamp, rewardDebt] = await publicClient.readContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'stakes',
      args: [userAddress],
    });

    // Calculate pending rewards
    const pendingReward = await publicClient.readContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'calculateReward',
      args: [userAddress],
    });

    return {
      amount: amount as bigint,
      timestamp: timestamp as bigint,
      pendingReward: (pendingReward as bigint) + (rewardDebt as bigint),
    };
  } catch (error) {
    console.error('Error getting stake info:', error);
    throw new Error('Failed to get stake information');
  }
}

/**
 * Get total staked amount in the pool
 * @returns Total staked amount in ETH
 */
export async function getTotalStaked(): Promise<string> {
  try {
    const publicClient = getPublicClient();

    const totalStaked = await publicClient.readContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'totalStaked',
    });

    return formatEther(totalStaked as bigint);
  } catch (error) {
    console.error('Error getting total staked:', error);
    throw new Error('Failed to get total staked amount');
  }
}

/**
 * Get contract balance (available for rewards)
 * @returns Contract balance in ETH
 */
export async function getPoolBalance(): Promise<string> {
  try {
    const publicClient = getPublicClient();

    const balance = await publicClient.readContract({
      address: config.contracts.stakingPool,
      abi: STAKING_POOL_ABI,
      functionName: 'getContractBalance',
    });

    return formatEther(balance as bigint);
  } catch (error) {
    console.error('Error getting pool balance:', error);
    throw new Error('Failed to get pool balance');
  }
}

/**
 * Format stake info for display
 * @param stakeInfo Stake information
 * @returns Formatted string
 */
export function formatStakeInfo(stakeInfo: StakeInfo): string {
  const amount = formatEther(stakeInfo.amount);
  const reward = formatEther(stakeInfo.pendingReward);
  const date = new Date(Number(stakeInfo.timestamp) * 1000);

  let message = `📊 Your Staking Info\n\n`;
  message += `💰 Staked: ${amount} ETH\n`;
  message += `🎁 Pending Rewards: ${reward} mockETH\n`;

  if (Number(stakeInfo.timestamp) > 0) {
    message += `📅 Staked Since: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n`;

    // Calculate time elapsed
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - Number(stakeInfo.timestamp);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    message += `⏱️ Time Elapsed: ${hours}h ${minutes}m\n`;
  }

  message += `\n💡 Rewards are paid in mockETH tokens!`;

  return message;
}

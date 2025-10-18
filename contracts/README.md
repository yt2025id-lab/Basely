# Basely Smart Contracts

This directory contains Solidity smart contracts for the Basely DeFi Telegram Assistant.

## Contracts

### StakingPool.sol

A simple ETH staking pool contract that allows users to:
- Stake ETH and earn rewards over time
- Claim rewards without unstaking
- Unstake and withdraw all funds plus rewards

**Key Features:**
- 1% daily reward rate (configurable by owner)
- Pausable for emergency situations
- Owner can update reward rates and fund the pool

## Deployment Guide

### Option 1: Using Remix IDE (Recommended for beginners)

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `StakingPool.sol`
3. Copy the contract code from `StakingPool.sol`
4. Compile with Solidity 0.8.20+
5. Switch to "Deploy & Run Transactions" tab
6. Select "Injected Provider - MetaMask" environment
7. Connect to Base Sepolia testnet in MetaMask
8. Deploy the contract
9. Copy the deployed contract address to `.env` as `STAKING_POOL_ADDRESS`

### Option 2: Using Hardhat

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat (if not already initialized)
npx hardhat init

# Create deployment script
# contracts/deploy.ts
```

```typescript
import { ethers } from "hardhat";

async function main() {
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy();
  await stakingPool.deployed();

  console.log("StakingPool deployed to:", stakingPool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

```bash
# Deploy to Base Sepolia
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### Option 3: Using Foundry

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Deploy
forge create --rpc-url $BASE_RPC_URL \
  --private-key $PRIVATE_KEY \
  contracts/StakingPool.sol:StakingPool
```

## Funding the Pool

After deployment, fund the staking pool with ETH for rewards:

```bash
# Using cast (Foundry)
cast send $STAKING_POOL_ADDRESS --value 1ether --rpc-url $BASE_RPC_URL --private-key $PRIVATE_KEY

# Or send ETH directly to the contract address via MetaMask
```

## Testing on Base Sepolia

1. Get testnet ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
2. Deploy the StakingPool contract
3. Fund the pool with some ETH for rewards
4. Test staking via the Telegram bot

## Contract ABI

After deployment, you'll need the contract ABI for interaction. The ABI is automatically generated when you compile the contract. Save it to `contracts/StakingPoolABI.json` for use in the application.

## Security Notes

- This is a DEMO contract for educational purposes
- DO NOT use in production without a professional audit
- Use only on testnets with test funds
- The contract owner has privileged functions (pause, emergency withdraw)
- No timelock or access control beyond basic owner checks

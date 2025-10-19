/**
 * Interactive setup wizard for Basely
 * Run: npx tsx scripts/setup.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║       🤖 Basely Setup Wizard                         ║');
  console.log('║  AI-Powered DeFi Telegram Assistant on Base          ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // Check if .env exists
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists\n');
    console.log('📝 Current configuration:');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n').filter(line =>
      line.trim() && !line.startsWith('#') && line.includes('=')
    );
    lines.slice(0, 10).forEach(line => {
      const [key] = line.split('=');
      console.log(`   - ${key}`);
    });
  } else {
    console.log('📝 Creating .env file from template...');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created\n');
    } else {
      console.log('❌ .env.example not found!\n');
      return;
    }
  }

  console.log('\n📋 SETUP CHECKLIST:\n');

  // Step 1: Telegram Bot
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 1: Create Telegram Bot');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('1. Open Telegram and search for @BotFather');
  console.log('2. Send: /newbot');
  console.log('3. Follow instructions to create your bot');
  console.log('4. Copy the bot token');
  console.log('5. Edit .env and paste token in TELEGRAM_BOT_TOKEN\n');

  // Step 2: Get Testnet ETH
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 2: Get Base Sepolia Testnet ETH');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('1. Go to: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet');
  console.log('2. Connect your wallet (MetaMask)');
  console.log('3. Request testnet ETH (you need ~0.5 ETH)');
  console.log('4. Wait for confirmation\n');

  // Step 3: Setup Wallet
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 3: Configure Wallet');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('⚠️  IMPORTANT: Use a TESTNET-ONLY wallet!');
  console.log('1. Export private key from MetaMask (testnet wallet only!)');
  console.log('2. Edit .env and paste:');
  console.log('   PRIVATE_KEY=0xYOUR_PRIVATE_KEY');
  console.log('   WALLET_ADDRESS=0xYOUR_WALLET_ADDRESS\n');

  // Step 4: Deploy Contract
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 4: Deploy StakingPool Smart Contract');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📝 REMIX IDE Method (Easiest):');
  console.log('1. Go to: https://remix.ethereum.org/');
  console.log('2. Create new file: StakingPool.sol');
  console.log('3. Copy from: contracts/StakingPool.sol');
  console.log('4. Compile with Solidity 0.8.20+');
  console.log('5. Deploy:');
  console.log('   - Environment: Injected Provider - MetaMask');
  console.log('   - Switch MetaMask to Base Sepolia');
  console.log('   - Click "Deploy"');
  console.log('6. Copy contract address');
  console.log('7. Edit .env: STAKING_POOL_ADDRESS=0xYOUR_CONTRACT_ADDRESS');
  console.log('8. Fund contract with 0.1 ETH for rewards\n');

  // Step 5: Optional AI
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 5: AI Integration (Optional)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('For enhanced NLP (currently using rule-based parser):');
  console.log('1. Get API key from: https://console.anthropic.com/');
  console.log('2. Edit .env: ANTHROPIC_API_KEY=your_key');
  console.log('3. Update src/ai/commandParser.ts to use AI API\n');

  // Step 6: Install & Run
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Step 6: Install Dependencies & Run');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Run these commands:');
  console.log('   npm install');
  console.log('   npm run bot\n');

  // Validation
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Validating Configuration');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const config = parseEnv(envContent);

    let allGood = true;

    // Check Telegram token
    if (config.TELEGRAM_BOT_TOKEN && config.TELEGRAM_BOT_TOKEN !== 'your_telegram_bot_token_here') {
      console.log('✅ Telegram bot token configured');
    } else {
      console.log('❌ Telegram bot token not set');
      allGood = false;
    }

    // Check private key
    if (config.PRIVATE_KEY && config.PRIVATE_KEY.startsWith('0x') && config.PRIVATE_KEY.length > 20) {
      console.log('✅ Private key configured');

      // Check wallet balance
      try {
        const account = privateKeyToAccount(config.PRIVATE_KEY as `0x${string}`);
        const publicClient = createPublicClient({
          chain: baseSepolia,
          transport: http(config.BASE_RPC_URL || 'https://sepolia.base.org'),
        });
        const balance = await publicClient.getBalance({ address: account.address });
        const ethBalance = Number(balance) / 1e18;

        if (ethBalance > 0) {
          console.log(`✅ Wallet has ${ethBalance.toFixed(4)} ETH`);
        } else {
          console.log('⚠️  Wallet has 0 ETH - get testnet ETH from faucet');
          allGood = false;
        }
      } catch (e) {
        console.log('⚠️  Could not check wallet balance');
      }
    } else {
      console.log('❌ Private key not set');
      allGood = false;
    }

    // Check contract address
    if (config.STAKING_POOL_ADDRESS && config.STAKING_POOL_ADDRESS.startsWith('0x')) {
      console.log('✅ StakingPool contract address configured');
    } else {
      console.log('⚠️  StakingPool contract not deployed yet');
      allGood = false;
    }

    console.log('');

    if (allGood) {
      console.log('╔══════════════════════════════════════════════════════╗');
      console.log('║  🎉 Setup Complete! Ready to run the bot!           ║');
      console.log('╚══════════════════════════════════════════════════════╝\n');
      console.log('Start the bot with: npm run bot\n');
    } else {
      console.log('╔══════════════════════════════════════════════════════╗');
      console.log('║  ⚠️  Setup Incomplete - Check items above            ║');
      console.log('╚══════════════════════════════════════════════════════╝\n');
      console.log('Edit .env file and complete missing configuration\n');
    }

  } catch (error) {
    console.log('❌ Error validating configuration:', error);
  }

  console.log('📚 Documentation: README.md');
  console.log('🔗 Base Sepolia Explorer: https://sepolia.basescan.org/');
  console.log('💬 Need help? Check contracts/README.md for deployment guide\n');
}

function parseEnv(content: string): Record<string, string> {
  const config: Record<string, string> = {};
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      config[key.trim()] = valueParts.join('=').trim();
    }
  });
  return config;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });

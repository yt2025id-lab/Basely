// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MockETH} from "../MockETH.sol";
import {StakingPool} from "../StakingPool.sol";
import {console2} from "forge-std/console2.sol";

contract FundStakingPool is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        address mockETHAddress = vm.envAddress("MOCK_ETH_ADDRESS");
        address stakingPoolAddress = vm.envAddress("STAKING_POOL_ADDRESS");

        MockETH mockETH = MockETH(mockETHAddress);
        StakingPool stakingPool = StakingPool(payable(stakingPoolAddress));

        console2.log("Funding StakingPool with MockETH tokens...");
        console2.log("Deployer:", deployer);
        console2.log("MockETH:", mockETHAddress);
        console2.log("StakingPool:", stakingPoolAddress);

        // Check deployer's MockETH balance
        uint256 deployerBalance = mockETH.balanceOf(deployer);
        console2.log("Deployer MockETH Balance:", deployerBalance);

        // Mint 1000 MockETH to deployer for rewards pool
        uint256 rewardAmount = 1000 * 10**18; // 1000 mockETH

        vm.startBroadcast(deployerPrivateKey);

        // Mint MockETH to deployer
        mockETH.mint(deployer, rewardAmount);
        console2.log("Minted", rewardAmount, "mockETH to deployer");

        // Transfer MockETH to StakingPool
        bool success = mockETH.transfer(stakingPoolAddress, rewardAmount);
        require(success, "Transfer to StakingPool failed");
        console2.log("Transferred", rewardAmount, "mockETH to StakingPool");

        vm.stopBroadcast();

        // Verify balances
        uint256 stakingPoolBalance = mockETH.balanceOf(stakingPoolAddress);
        console2.log("StakingPool MockETH Balance:", stakingPoolBalance);
        console2.log("Reward Balance from contract:", stakingPool.getRewardBalance());
    }
}

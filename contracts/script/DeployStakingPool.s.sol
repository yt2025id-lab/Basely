// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {StakingPool} from "../StakingPool.sol";
import {console2} from "forge-std/console2.sol";

contract DeployStakingPool is Script {
    function setUp() public {}

    function run() public returns (StakingPool) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        address mockETHAddress = vm.envAddress("MOCK_ETH_ADDRESS");

        console2.log("Deploying StakingPool contract...");
        console2.log("Deployer address:", deployer);
        console2.log("MockETH address:", mockETHAddress);
        console2.log("Chain ID:", block.chainid);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy StakingPool with MockETH address
        StakingPool stakingPool = new StakingPool(mockETHAddress);

        console2.log("StakingPool deployed at:", address(stakingPool));
        console2.log("Owner:", stakingPool.owner());
        console2.log("MockETH token:", stakingPool.mockETH());
        console2.log("Reward rate:", stakingPool.rewardRate());
        console2.log("Total staked:", stakingPool.totalStaked());

        vm.stopBroadcast();

        return stakingPool;
    }
}

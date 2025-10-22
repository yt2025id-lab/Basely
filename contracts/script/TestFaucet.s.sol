// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MockETH} from "../MockETH.sol";
import {console2} from "forge-std/console2.sol";

contract TestFaucet is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        address mockETHAddress = vm.envAddress("MOCK_ETH_ADDRESS");

        console2.log("Testing MockETH Faucet...");
        console2.log("MockETH Address:", mockETHAddress);
        console2.log("User Address:", deployer);

        MockETH mockETH = MockETH(mockETHAddress);

        // Check balance before
        uint256 balanceBefore = mockETH.balanceOf(deployer);
        console2.log("Balance Before:", balanceBefore);

        vm.startBroadcast(deployerPrivateKey);

        // Call faucet
        mockETH.faucet();

        vm.stopBroadcast();

        // Check balance after
        uint256 balanceAfter = mockETH.balanceOf(deployer);
        console2.log("Balance After:", balanceAfter);
        console2.log("Received:", balanceAfter - balanceBefore);
        console2.log("Expected: 10 mockETH (10000000000000000000)");
    }
}

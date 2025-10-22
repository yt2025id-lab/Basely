// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MockETH} from "../MockETH.sol";
import {console2} from "forge-std/console2.sol";

contract DeployMockETH is Script {
    function setUp() public {}

    function run() public returns (MockETH) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console2.log("Deploying MockETH contract...");
        console2.log("Deployer address:", deployer);
        console2.log("Chain ID:", block.chainid);

        vm.startBroadcast(deployerPrivateKey);

        MockETH mockETH = new MockETH();

        console2.log("MockETH deployed at:", address(mockETH));
        console2.log("Token Name:", mockETH.name());
        console2.log("Token Symbol:", mockETH.symbol());
        console2.log("Decimals:", mockETH.decimals());

        vm.stopBroadcast();

        return mockETH;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {BaselySwap} from "../src/BaselySwap.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        BaselySwap swap = new BaselySwap();

        vm.stopBroadcast();
    }
}

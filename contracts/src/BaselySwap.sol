// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BaselySwap {
    // Events
    event SwapExecuted(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amount,
        string intent
    );

    event BalanceUpdated(address indexed user, uint256 newBalance);

    // Simple balance tracking
    mapping(address => uint256) public userBalances;

    // Receive ETH
    receive() external payable {
        userBalances[msg.sender] += msg.value;
        emit BalanceUpdated(msg.sender, userBalances[msg.sender]);
    }

    // Execute swap - PoC version
    function executeSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        string calldata userMessage
    ) external payable returns (bool) {
        require(amountIn > 0, "Amount must be greater than 0");

        // Log the user intent on-chain (proof of concept)
        emit SwapExecuted(msg.sender, tokenIn, tokenOut, amountIn, userMessage);

        // In real version, this would:
        // 1. Transfer tokenIn from user
        // 2. Call 1inch API for best quote
        // 3. Execute swap
        // 4. Transfer tokenOut to user

        return true;
    }

    // Get user balance
    function getBalance(address user) external view returns (uint256) {
        return userBalances[user];
    }

    // Withdraw balance (for testing)
    function withdraw(uint256 amount) external {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        userBalances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}

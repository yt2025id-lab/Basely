// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StakingPool
 * @dev Simple staking pool contract for Basely DeFi Assistant
 * @notice This is a basic implementation for demonstration purposes
 * Users can stake ETH and earn rewards in MockETH tokens
 */
contract StakingPool {
    // Staking information for each user
    struct Stake {
        uint256 amount;           // Amount staked
        uint256 timestamp;        // Time when staked
        uint256 rewardDebt;       // Rewards already claimed
    }

    // State variables
    mapping(address => Stake) public stakes;
    uint256 public totalStaked;
    uint256 public rewardRate = 100; // 1% per day (100 basis points)
    uint256 public constant SECONDS_PER_DAY = 86400;
    uint256 public constant BASIS_POINTS = 10000;

    address public owner;
    bool public paused;

    // MockETH token address for rewards
    address public mockETH;

    // Events
    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    event EmergencyWithdraw(address indexed user, uint256 amount);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    constructor(address _mockETH) {
        require(_mockETH != address(0), "Invalid MockETH address");
        owner = msg.sender;
        paused = false;
        mockETH = _mockETH;
    }

    /**
     * @dev Stake ETH into the pool
     */
    function stake() external payable whenNotPaused {
        require(msg.value > 0, "Cannot stake 0 ETH");

        Stake storage userStake = stakes[msg.sender];

        // If user already has a stake, claim pending rewards first
        if (userStake.amount > 0) {
            uint256 pending = calculateReward(msg.sender);
            if (pending > 0) {
                userStake.rewardDebt += pending;
            }
        }

        // Update stake
        userStake.amount += msg.value;
        userStake.timestamp = block.timestamp;
        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Unstake all ETH and claim rewards in MockETH
     */
    function unstake() external whenNotPaused {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 amount = userStake.amount;
        uint256 reward = calculateReward(msg.sender) + userStake.rewardDebt;

        // Reset stake
        userStake.amount = 0;
        userStake.timestamp = 0;
        userStake.rewardDebt = 0;
        totalStaked -= amount;

        // Transfer staked ETH back to user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");

        // Transfer MockETH rewards to user (if any)
        if (reward > 0) {
            require(IERC20(mockETH).transfer(msg.sender, reward), "Reward transfer failed");
        }

        emit Unstaked(msg.sender, amount, reward);
    }

    /**
     * @dev Claim pending rewards without unstaking
     */
    function claimReward() external whenNotPaused {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 reward = calculateReward(msg.sender) + userStake.rewardDebt;
        require(reward > 0, "No rewards to claim");

        // Reset reward debt and timestamp
        userStake.rewardDebt = 0;
        userStake.timestamp = block.timestamp;

        // Transfer MockETH rewards to user
        require(IERC20(mockETH).transfer(msg.sender, reward), "Transfer failed");

        emit RewardClaimed(msg.sender, reward);
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param user Address of the user
     * @return Pending reward amount
     */
    function calculateReward(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (userStake.amount == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp - userStake.timestamp;
        uint256 reward = (userStake.amount * rewardRate * stakingDuration) /
                         (BASIS_POINTS * SECONDS_PER_DAY);

        return reward;
    }

    /**
     * @dev Get stake information for a user
     * @param user Address of the user
     * @return amount Staked amount
     * @return timestamp Stake timestamp
     * @return pendingReward Pending reward
     */
    function getStakeInfo(address user) external view returns (
        uint256 amount,
        uint256 timestamp,
        uint256 pendingReward
    ) {
        Stake memory userStake = stakes[user];
        return (
            userStake.amount,
            userStake.timestamp,
            calculateReward(user) + userStake.rewardDebt
        );
    }

    /**
     * @dev Update reward rate (only owner)
     * @param newRate New reward rate in basis points
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 1000, "Rate too high"); // Max 10% per day
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    /**
     * @dev Pause/unpause the contract (only owner)
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /**
     * @dev Emergency withdraw ETH (only owner) - withdraws all staked ETH
     */
    function emergencyWithdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Emergency withdraw MockETH rewards (only owner)
     */
    function emergencyWithdrawMockETH() external onlyOwner {
        uint256 balance = IERC20(mockETH).balanceOf(address(this));
        require(IERC20(mockETH).transfer(owner, balance), "Transfer failed");
    }

    /**
     * @dev Get contract MockETH balance (for rewards)
     */
    function getRewardBalance() external view returns (uint256) {
        return IERC20(mockETH).balanceOf(address(this));
    }

    /**
     * @dev Get contract ETH balance (for staked amount)
     */
    function getStakedBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Fallback function to receive ETH for staking
     */
    receive() external payable {}
}

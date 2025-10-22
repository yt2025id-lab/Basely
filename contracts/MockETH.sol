// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockETH
 * @dev Mock ERC20 token for testing Basely staking rewards
 * @notice This token allows unlimited minting for testing purposes
 * Anyone can mint tokens or claim from faucet
 */
contract MockETH is ERC20 {
    uint8 private _decimals;
    uint256 public constant FAUCET_AMOUNT = 10 * 10**18; // 10 mockETH

    // Events
    event Minted(address indexed to, uint256 amount);
    event FaucetClaimed(address indexed user, uint256 amount);

    /**
     * @dev Constructor sets token name and symbol
     */
    constructor() ERC20("Mock ETH", "mockETH") {
        _decimals = 18;
    }

    /**
     * @dev Returns the number of decimals
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Mint tokens to any address
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint (in wei, 18 decimals)
     * @notice Anyone can call this function for testing purposes
     */
    function mint(address to, uint256 amount) external {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than 0");

        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @dev Faucet function - claim 10 mockETH for free
     * @notice Can be called multiple times by anyone for testing
     */
    function faucet() external {
        _mint(msg.sender, FAUCET_AMOUNT);
        emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
    }

    /**
     * @dev Batch mint to multiple addresses (useful for testing)
     * @param recipients Array of addresses to receive tokens
     * @param amounts Array of amounts corresponding to each recipient
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "Empty arrays");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Cannot mint to zero address");
            require(amounts[i] > 0, "Amount must be greater than 0");
            _mint(recipients[i], amounts[i]);
            emit Minted(recipients[i], amounts[i]);
        }
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Receive Test Link from https://faucets.chain.link/
contract KudosToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Kudos", "KDS") {
        _mint(msg.sender, initialSupply);
    }
}
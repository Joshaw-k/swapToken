// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PEVCOIN is ERC20 {
    constructor() ERC20("PEVCOIN", "PCN") {
        _mint(msg.sender, 1_000_000e18);
    }
}
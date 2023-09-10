// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IMyERC20 {
     function approve(address spender, uint rawAmount) external returns (bool);
     function balanceOf(address _owner) external view returns (uint256 balance);
     function transferFrom(address from, address to, uint256 value) external returns (bool);
     function transfer(address to, uint256 value) external returns (bool);
     function allowance(address owner, address spender) external view returns (uint256);
}

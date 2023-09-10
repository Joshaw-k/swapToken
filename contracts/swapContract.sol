// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {IMyERC20} from "./interface/IERC20.sol";

contract SwapContract {
    address pevcoinAddr;
    address rollcoinAddr;
    uint pevcoinReserve;
    uint rollcoinReserve;
    uint totalReserve;
    struct LiquidityProvider {
        uint pevcoinAmount;
        uint rollcoinAmount;
    }
    mapping (address=>LiquidityProvider) liquidityProvider;

    constructor(address _pevcoinAddr, address _rollcoinAddr){
        pevcoinAddr = _pevcoinAddr;
        rollcoinAddr =_rollcoinAddr;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        IMyERC20(pevcoinAddr).transferFrom(msg.sender,address(this),amountA);
        IMyERC20(rollcoinAddr).transferFrom(msg.sender,address(this),amountB);
        pevcoinReserve += amountA;
        rollcoinReserve += amountB;
        cpmm(pevcoinReserve, rollcoinReserve);
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.pevcoinAmount = amountA;
        provider.rollcoinAmount = amountB;
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external {
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        IMyERC20(pevcoinAddr).transfer(msg.sender,amountA);
        IMyERC20(rollcoinAddr).transfer(msg.sender,amountB);
        pevcoinReserve -= amountA;
        rollcoinReserve += amountB;
        cpmm(pevcoinReserve, rollcoinReserve);
        provider.pevcoinAmount -= amountA;
        provider.rollcoinAmount -= amountB;
    }

    function cpmm(uint _pevcoinReserve, uint _rollcoinReserve) public {
       totalReserve = _pevcoinReserve * _rollcoinReserve;
    }

    function amountPevcoinToReceive(uint amountIn,uint amountOutMin) public view returns(uint amountToReceive){
        amountToReceive = pevcoinReserve - (totalReserve/(rollcoinReserve-amountIn));
        }

    function amountrollcoinToReceive(uint amountIn,uint amountOutMin) public view returns(uint amountToReceive){
        amountToReceive = rollcoinReserve - (totalReserve/(pevcoinReserve-amountIn));
        }

    function swapPevtokenForRollTokens(
        uint amountIn,
        uint amountOutMin,
        address to
    ) public {
        require(amountIn >0, "No zero amountin");
        uint balance = IMyERC20(pevcoinAddr).balanceOf(msg.sender);
        require(balance >0, "No zero amountin");
        IMyERC20(pevcoinAddr).transferFrom(msg.sender, address(this), amountIn);
        uint amountToReceive = amountPevcoinToReceive(amountIn,amountOutMin);
        bool success = IMyERC20(rollcoinAddr).transfer(to,amountToReceive);
        require(success, "could not transfer");
        pevcoinReserve += amountIn;
        rollcoinReserve -= amountOutMin;
    }

    function swapRolltokenForPevTokens(
        uint amountIn,
        uint amountOutMin,
        address to
    ) public {
        require(amountIn >0, "No zero amountin");
        uint balance = IMyERC20(pevcoinAddr).balanceOf(msg.sender);
        require(balance >0, "No zero amountin");
        IMyERC20(rollcoinAddr).transferFrom(msg.sender, address(this), amountIn);
        uint amountToReceive = amountPevcoinToReceive(amountIn,amountOutMin);
        bool success = IMyERC20(pevcoinAddr).transfer(to,amountToReceive);
        require(success, "could not transfer");
        pevcoinReserve += amountIn;
        rollcoinReserve -= amountOutMin;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import {IMyERC20} from "./interface/IERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
        IERC20(pevcoinAddr).transferFrom(msg.sender,address(this),amountA);
        IERC20(rollcoinAddr).transferFrom(msg.sender,address(this),amountB);
        pevcoinReserve += amountA;
        rollcoinReserve += amountB;
        cpmm(pevcoinReserve, rollcoinReserve);
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.pevcoinAmount = amountA;
        provider.rollcoinAmount = amountB;
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external {
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        require(
            provider.pevcoinAmount >= amountA,
            "Insufficient ammount of pevcoin in Liquidity Pool"
        );
        require(
            provider.rollcoinAmount >= amountB,
            "Insufficient ammount of rollcoin in Liquidity Pool"
        );
        bool successA = IERC20(pevcoinAddr).transfer(msg.sender,amountA);
        require(successA, "Failed to remove liquidity");
        bool successB = IERC20(rollcoinAddr).transfer(msg.sender,amountB);
        require(successB, "Failed to remove liquidity");
        pevcoinReserve -= amountA;
        rollcoinReserve -= amountB;
        cpmm(pevcoinReserve, rollcoinReserve);
        provider.pevcoinAmount -= amountA;
        provider.rollcoinAmount -= amountB;
    }

    function cpmm(uint _pevcoinReserve, uint _rollcoinReserve) public {
       totalReserve = _pevcoinReserve * _rollcoinReserve;
    }

    function amountPevcoinToReceive(uint amountIn) public view returns(uint amountToReceive){
        amountToReceive = pevcoinReserve - (totalReserve/(rollcoinReserve+amountIn));
        }

    function amountRollcoinToReceive(uint amountIn) public view returns(uint amountToReceive){
        amountToReceive = rollcoinReserve - (totalReserve/(pevcoinReserve+amountIn));
        }

    function swapPevtokenForRollTokens(
        uint amountIn,
        address to
    ) public {
        require(amountIn >0, "No zero amountin");
        uint balance = IERC20(pevcoinAddr).balanceOf(msg.sender);
        require(balance >0, "No zero amountin");
        IERC20(pevcoinAddr).transferFrom(msg.sender, address(this), amountIn);
        uint amountToReceive = amountPevcoinToReceive(amountIn);

        bool success = IERC20(rollcoinAddr).transfer(to,amountToReceive);
        require(success, "could not transfer");
        pevcoinReserve += amountIn;
        rollcoinReserve -= amountToReceive;
    }

    function swapRolltokenForPevTokens(
        uint amountIn,
        address to
    ) public {
        require(amountIn >0, "No zero amountin");
        uint balance = IERC20(pevcoinAddr).balanceOf(msg.sender);
        require(balance >0, "No zero amountin");
        IERC20(rollcoinAddr).transferFrom(msg.sender, address(this), amountIn);
        uint amountToReceive = amountRollcoinToReceive(amountIn);
        bool success = IERC20(pevcoinAddr).transfer(to,amountToReceive);
        require(success, "could not transfer");
        pevcoinReserve += amountIn;
        rollcoinReserve -= amountToReceive;
    }
}
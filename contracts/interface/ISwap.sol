// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ISwap {
     function addLiquidity(uint256 amountA, uint256 amountB) external;
     function removeLiquidity(uint256 amountA, uint256 amountB) external;
     function swapPevtokenForRollTokens(
        uint amountIn,
        uint amountOutMin,
        address to
    ) external;
    function swapRolltokenForPevTokens(
        uint amountIn,
        uint amountOutMin,
        address to
    ) external;
}

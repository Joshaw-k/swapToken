import { ethers } from "hardhat";

async function main() {
  const swapContract = await ethers.getContractAt(
    "ISwap",
    "0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"
  );

  const pevcoin = await ethers.getContractAt(
    "IERC20",
    "0xF3e110Af5988CE66ac4e493B081bAfBB6caA001F"
  );

  const rollcoin = await ethers.getContractAt(
    "IERC20",
    "0xC5680Dba8306d229DB2bfaBde29eB6064d0EE5B6"
  );

  const pevAmount = ethers.parseEther("10000");

  const rollAmount = ethers.parseEther("10000");

  // Approving the Swap Contract

  await pevcoin.approve(
    "0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B",
    pevAmount
  );

  await rollcoin.approve(
    "0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B",
    rollAmount
  );

  // Returning the allowance
  console.log(
    await pevcoin.allowance(
      "0xb5119738bb5fe8be39ab592539eaa66f03a77174",
      "0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"
    )
  );
  console.log(
    await rollcoin.allowance(
      "0xb5119738bb5fe8be39ab592539eaa66f03a77174",
      "0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"
    )
  );

  //balance of contract before adding liquidity
  console.log(
    await pevcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"),
    await rollcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B")
  );

  //Adding Liquidity
  await swapContract.addLiquidity(
    ethers.parseEther("1000"),
    ethers.parseEther("1000")
  );
  //balance of contract after adding liquidity
  console.log(
    await pevcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"),
    await rollcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B")
  );

  //Adding Liquidity
  await swapContract.removeLiquidity(
    ethers.parseEther("50"),
    ethers.parseEther("50")
  );

  //balance of contract after removing liquidity
  console.log(
    await pevcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"),
    await rollcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B")
  );

  //swaping Rolltokens For PevTokens
  await swapContract.swapRolltokenForPevTokens(
    ethers.parseEther("100"),
    "0xe26C94adb17e135a09478c5f41D21af338345DDD"
  );

  //balance of swap contract and to address after swaping tokens
  console.log(
    await pevcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"),
    await rollcoin.balanceOf("0xe26C94adb17e135a09478c5f41D21af338345DDD")
  );

  //swaping Pevtoken For RollTokens
  await swapContract.swapPevtokenForRollTokens(
    ethers.parseEther("100"),
    "0xe26C94adb17e135a09478c5f41D21af338345DDD"
  );

  //balance of swap contract and to address after swaping tokens
  console.log(
    await pevcoin.balanceOf("0xb080dd1a54488B0e1d792f1d8Fb6f4241dAf6F6B"),
    await rollcoin.balanceOf("0xe26C94adb17e135a09478c5f41D21af338345DDD")
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

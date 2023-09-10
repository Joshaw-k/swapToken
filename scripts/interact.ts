import { ethers } from "hardhat";

async function main() {
  const swapContract = await ethers.getContractAt(
    "ISwap",
    "0xAc045B906ea570938BF937291515Be31B948c9c3"
  );

  const pevcoin = await ethers.getContractAt(
    "IMyERC20",
    "0x893B25C508F0486Cd2C99b45a1EEA397784deF57"
  );

  const rollcoin = await ethers.getContractAt(
    "IMyERC20",
    "0x9A425368a516c6ab1a51a8659906D8eC2Def048c"
  );

  const pevAmount = ethers.parseUnits("1000", 8);

  const rollAmount = ethers.parseUnits("1000", 8);

  await pevcoin.approve(
    "0xAc045B906ea570938BF937291515Be31B948c9c3",
    pevAmount
  );

  await rollcoin.approve(
    "0xAc045B906ea570938BF937291515Be31B948c9c3",
    rollAmount
  );
  // console.log(swapContract);
  console.log(
    await pevcoin.allowance(
      "0xb5119738bb5fe8be39ab592539eaa66f03a77174",
      "0xAc045B906ea570938BF937291515Be31B948c9c3"
    )
  );
  console.log(
    await rollcoin.allowance(
      "0xb5119738bb5fe8be39ab592539eaa66f03a77174",
      "0xde79380fbd39e08150adaa5c6c9de3146f53029e"
    )
  );
  await swapContract.addLiquidity(
    ethers.parseUnits("100", 8),
    ethers.parseUnits("100", 8)
  );
  await swapContract.swapPevtokenForRollTokens();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x840748f7fd3ea956e5f4c88001da5cc1abcbc038;
// 0x1befe2d8417e22da2e0432560ef9b2ab68ab75ad;
// 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266;

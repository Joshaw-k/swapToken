import { ethers } from "hardhat";

async function main() {
  const swapContract = await ethers.getContractAt(
    "ISwap",
    "0xde79380fbd39e08150adaa5c6c9de3146f53029e"
  );

  const pevcoin = await ethers.getContractAt(
    "IMyERC20",
    "0x840748f7fd3ea956e5f4c88001da5cc1abcbc038"
  );

  const rollcoin = await ethers.getContractAt(
    "IMyERC20",
    "0x1befe2d8417e22da2e0432560ef9b2ab68ab75ad"
  );

  const pevAmount = ethers.parseUnits("1000", 8);

  const rollAmount = ethers.parseUnits("1000", 8);

  await pevcoin.approve(
    "0xde79380fbd39e08150adaa5c6c9de3146f53029e",
    pevAmount
  );

  await rollcoin.approve(
    "0xde79380fbd39e08150adaa5c6c9de3146f53029e",
    rollAmount
  );
  // console.log(swapContract);
  console.log(
    await pevcoin.allowance(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "0xde79380fbd39e08150adaa5c6c9de3146f53029e"
    )
  );
  console.log(
    await rollcoin.allowance(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "0xde79380fbd39e08150adaa5c6c9de3146f53029e"
    )
  );
  await swapContract.addLiquidity(
    ethers.parseUnits("100", 8),
    ethers.parseUnits("100", 8)
  );
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

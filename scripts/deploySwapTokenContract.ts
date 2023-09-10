import { ethers } from "hardhat";

async function main() {
  const swapContract = await ethers.deployContract("SwapContract", [
    "0x840748f7fd3ea956e5f4c88001da5cc1abcbc038",
    "0x1befe2d8417e22da2e0432560ef9b2ab68ab75ad",
  ]);
  swapContract.waitForDeployment();

  console.log(swapContract.target);
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

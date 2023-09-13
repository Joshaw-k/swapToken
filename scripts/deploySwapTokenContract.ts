import { ethers } from "hardhat";

async function main() {
  const swapContract = await ethers.deployContract("SwapContract", [
    "0xF3e110Af5988CE66ac4e493B081bAfBB6caA001F",
    "0xC5680Dba8306d229DB2bfaBde29eB6064d0EE5B6",
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

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // sepolia: {
    //   url: process.env.SEPOLIARPC,
    //   //@ts-ignore
    //   accounts: [
    //     process.env.PRIVATE_KEY_1,
    //   ],
    // },
    hardhat: {
      forking: {
        url: "https://sepolia.infura.io/v3/cf05af5bacf84b28aa67c6dea5d1d5c2",
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};

export default config;

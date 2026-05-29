import 'dotenv/config';
import hardhatEthersPlugin from '@nomicfoundation/hardhat-ethers';

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: '0.8.20',
  plugins: [hardhatEthersPlugin],
  networks: {
    sepolia: {
      type: 'http',
      url: process.env.SEPOLIA_RPC || 'https://rpc.sepolia.org',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    baseSepolia: {
      type: 'http',
      url: process.env.BASE_SEPOLIA_RPC || 'https://sepolia.base.org',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    arbitrumSepolia: {
      type: 'http',
      url: process.env.ARBITRUM_SEPOLIA_RPC || 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    amoy: {
      type: 'http',
      url: process.env.AMOY_RPC || 'https://rpc-amoy.polygon.technology',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

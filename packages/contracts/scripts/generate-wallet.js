import { ethers } from 'ethers';

async function main() {
  const wallet = ethers.Wallet.createRandom();
  console.log('=== New Test Wallet Generated ===\n');
  console.log('Address:', wallet.address);
  console.log('Private Key:', wallet.privateKey);
  console.log('Mnemonic:', wallet.mnemonic?.phrase);
  console.log('\n=== Faucet Links ===');
  console.log('Sepolia: https://sepoliafaucet.com/');
  console.log('Base Sepolia: https://www.coinbase.com/faucets/base-sepolia-faucet');
  console.log('Arbitrum Sepolia: https://faucet.quicknode.com/arbitrum/sepolia');
  console.log('Polygon Amoy: https://faucet.polygon.technology/');
  console.log('\nIMPORTANT: Save this wallet info and fund it before deploying.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

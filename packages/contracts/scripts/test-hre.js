import hre from 'hardhat';

async function main() {
  const connection = await hre.network.getOrCreate();
  console.log('connection keys:', Object.keys(connection));
  console.log('connection.ethers:', typeof connection.ethers);
  
  if (connection.ethers) {
    const ethers = connection.ethers;
    const signers = await ethers.getSigners();
    console.log('Signers:', signers.map(s => s.address));
    console.log('Provider:', typeof ethers.provider);
  }
}

main().catch(console.error);

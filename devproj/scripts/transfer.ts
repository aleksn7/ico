import { ethers } from "hardhat";

const MARKET_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const market = await ethers.getContractAt("Market", MARKET_ADDRESS);
  const signer = (await ethers.getSigners())[0];

  await market
    .connect(signer)
    .buy({ value: BigInt(50 * Math.pow(10, 18))})

  console.log("Token success bought!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

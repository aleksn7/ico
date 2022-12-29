import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts/src.ts";

const totalSupply = 5*Math.pow(10, 20);

async function deployToken() {
  const Token = await ethers.getContractFactory("FixSupplyToken");
  const token = await Token.deploy("FixSupplyToken", "TOKEN");

  await token.deployed();

  return token;
}

async function deployMarket(tokenAddress: string) {
  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy(tokenAddress, 1, BigInt(50 * Math.pow(10, 18)));

  await market.deployed;

  return market;
}

async function main() {
  const token = await deployToken();
  const market = await deployMarket(token.address);

  await token.transferOwnership(market.address);

  console.log(`Deployed to market ${market.address}, token ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const PayableContract = await ethers.getContractFactory("PayableContract");
  const payableContract = await PayableContract.deploy();

  await payableContract.deployed();

  console.log("PayableContract deployed to:", payableContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ContractX = await ethers.getContractFactory("X");
  const contractX = await ContractX.deploy("Contract X");
  await contractX.deployed();
  console.log("ContractX deployed to:", contractX.address);

  const ContractY = await ethers.getContractFactory("Y");
  const contractY = await ContractY.deploy("Hello from Y");
  await contractY.deployed();
  console.log("ContractY deployed to:", contractY.address);

  const ContractA = await ethers.getContractFactory("A");
  const contractA = await ContractA.deploy();
  await contractA.deployed();
  console.log("ContractA deployed to:", contractA.address);

  const ContractB = await ethers.getContractFactory("B");
  const contractB = await ContractB.deploy("Contract B", "Hello from B");
  await contractB.deployed();
  console.log("ContractB deployed to:", contractB.address);

  const ContractC = await ethers.getContractFactory("C");
  const contractC = await ContractC.deploy();
  await contractC.deployed();
  console.log("ContractC deployed to:", contractC.address);

  const ContractD = await ethers.getContractFactory("D");
  const contractD = await ContractD.deploy();
  await contractD.deployed();
  console.log("ContractD deployed to:", contractD.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

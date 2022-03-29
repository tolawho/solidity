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
  const Caller = await ethers.getContractFactory("Caller");
  const caller = await Caller.deploy();
  await caller.deployed();
  console.log("Caller deployed to:", caller.address);

  const Callee = await ethers.getContractFactory("Callee");
  const callee = await Callee.deploy();
  await callee.deployed();
  console.log("Callee deployed to:", callee.address);

  const Selector = await ethers.getContractFactory("Selector");
  const selector = await Selector.deploy();
  await selector.deployed();
  console.log("Selector deployed to:", selector.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

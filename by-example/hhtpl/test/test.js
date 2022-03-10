const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", () => {
  let deployer, sender, greeter;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter", deployer);
    greeter = await Greeter.deploy(78910);
    await greeter.deployed();
  });

  it("Should", async () => {});
});

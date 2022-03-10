const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", () => {
  let deployer, sender, contract;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Contract", deployer);
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should", async () => {});
});

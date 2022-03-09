const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Variables", () => {
  let deployer, sender, variables;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const Variables = await ethers.getContractFactory("Variables", deployer);
    variables = await Variables.deploy();
  });

  it("Should return the new greeting once it's changed", async () => {
    let block = await ethers.provider.getBlock("latest");
    let vars = await variables.connect(sender).getVars();
    expect(vars._local).to.be.equal(456);
    expect(vars._timestamp).to.be.equal(block.timestamp);
    expect(vars._sender.toString()).to.be.equal(sender.address);
  });
});

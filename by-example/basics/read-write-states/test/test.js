const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReadWriteState", () => {
  let deployer, sender, readWriteState, initialNumber;
  beforeEach(async () => {
    initialNumber = 1234567;
    [deployer, sender] = await ethers.getSigners();
    const ReadWriteState = await ethers.getContractFactory(
      "ReadWriteState",
      deployer
    );
    readWriteState = await ReadWriteState.deploy(initialNumber);
  });
  it("Should return initial number", async () => {
    let myNumber = await readWriteState.myNumber();
    expect(myNumber).to.be.equal(initialNumber);
  });

  it("Should possible to change myNumber", async () => {
    await readWriteState.set(1678);
    let myNumber = await readWriteState.get();
    expect(myNumber).to.be.equal(1678);
  });
});

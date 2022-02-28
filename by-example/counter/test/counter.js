const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", () => {
  let deployer, counter;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter", deployer);
    counter = await Counter.deploy();
  });

  it("Should return the count value", async () => {
    expect(await counter.get()).to.equal(0);
  });

  it("Should be possible increment the count value", async () => {
    await counter.increment();
    expect(await counter.get()).to.equal(1);
  });

  it("Should not possible decrement if count value is zero", async () => {
    await expect(counter.decrement()).to.be.revertedWith("Counter is zero");
  });

  it("Should be possible decrement the count value if greater than zero", async () => {
    await counter.increment();
    expect(await counter.get()).to.equal(1);
    await counter.decrement();
    expect(await counter.get()).to.equal(0);
  });
});

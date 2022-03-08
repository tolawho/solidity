const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const { BigNumber } = require("ethers");

use(solidity);

describe("Primitives", () => {
  let deployer, primitives;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const Primitives = await ethers.getContractFactory("Primitives", deployer);
    primitives = await Primitives.deploy();
  });

  it("Should return boolean", async () => {
    expect(await primitives.boolValue()).to.be.true;
  });

  it("Should return uint", async () => {
    expect(await primitives.u8()).to.be.equal(1);
    expect(await primitives.u256()).to.be.equal(124);
  });

  it("Should return int", async () => {
    expect(await primitives.i8()).to.be.equal(-1);
    expect(await primitives.i256()).to.be.equal(289);
  });

  it("Should return max and min of int(int256)", async () => {
    let maxInt = await primitives.maxInt();
    expect(maxInt.toString()).to.be.equal(
      "57896044618658097711785492504343953926634992332820282019728792003956564819967"
    );
    expect(await primitives.minInt()).to.be.equal(
      "-57896044618658097711785492504343953926634992332820282019728792003956564819968"
    );
  });

  it("Should be a address", async () => {
    let owner = await primitives.owner();
    expect(owner).to.be.properAddress;
    expect(owner).to.be.equal("0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c");
  });

  it("Should be default value", async () => {
    expect(await primitives.defaultBool()).to.be.false;
    expect(await primitives.defaultUint()).to.be.equal(0);
    expect(await primitives.defaultInt()).to.be.equal(0);
    expect(await primitives.defaultAddr()).to.be.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
});

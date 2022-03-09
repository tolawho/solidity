const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyTest", () => {
  let deployer, sender, constImmut;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const ConstImmut = await ethers.getContractFactory("ConstImmut", deployer);
    constImmut = await ConstImmut.deploy(78910);
  });

  describe("Constant", () => {
    it("Should return an address", async () => {
      let myAddress = await constImmut.MY_ADDRESS();
      expect(myAddress).to.be.properAddress;
      expect(myAddress.toString()).to.be.equal(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      );
    });
    it("Should return an unsigned int number", async () => {
      let myUint = await constImmut.MY_UINT();
      expect(myUint).to.be.equal(123456);
    });
  });

  describe("Immutable", () => {
    it("Should return deployer address", async () => {
      let myImmutableAddress = await constImmut.MY_IMMUTABLE_ADDRESS();
      expect(myImmutableAddress).to.be.properAddress;
      expect(myImmutableAddress.toString()).to.be.equal(deployer.address);
    });
    it("Should return a number passed to constructor", async () => {
      let myImmutableUint = await constImmut.MY_IMMUTABLE_UINT();
      expect(myImmutableUint).to.be.equal(78910);
    });
  });
});

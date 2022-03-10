const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UnitsAndGas", () => {
  let deployer, sender, unitsAndGas;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const UnitsAndGas = await ethers.getContractFactory(
      "UnitsAndGas",
      deployer
    );
    unitsAndGas = await UnitsAndGas.deploy();
    await unitsAndGas.deployed();
  });

  describe("Ether & Wei", () => {
    it("Should return a one wei", async () => {
      expect(await unitsAndGas.oneWei()).to.be.equal(1);
      expect(await unitsAndGas.isOneWei()).to.be.true;
    });
    it("Should return a one ether", async () => {
      expect((await unitsAndGas.oneEther()).toString()).to.be.equal(
        "1000000000000000000"
      );
      expect(await unitsAndGas.isOneEther()).to.be.true;
    });
  });

  describe("Gas & Gas Price", () => {
    it("Transaction fails when all gas spent", async () => {
      let block = await ethers.provider.getBlock("latest");
      let inc = 12345;
      await ethers.provider.send("evm_increaseTime", [inc]);
      await ethers.provider.send("evm_setNextBlockTimestamp", [
        block.timestamp + inc,
      ]);
      await ethers.provider.send("evm_setBlockGasLimit", [
        `0x${ethers.BigNumber.from(6000000)}`,
      ]);
      await ethers.provider.send("evm_mine", []);

      // const trace = await ethers.provider.send("debug_traceTransaction", [
      //   block.transactions.pop(),
      // ]);

      try {
        await unitsAndGas.outOfGas();
        expect.fail("Transaction ran out of gas");
      } catch (error) {
        expect(error.message.toString()).to.have.string(
          "Transaction ran out of gas"
        );
      }
    });
  });
});

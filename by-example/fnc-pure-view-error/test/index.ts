import { expect } from "chai";
import { ethers } from "hardhat";

import { FuncPureViewError } from "../typechain";

describe("FuncPureViewError", () => {
  let deployer, contract: FuncPureViewError;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory(
      "FuncPureViewError",
      deployer
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  describe("TestCase", async () => {
    it("Should revert if input x less than 10", async () => {
      await expect(contract.fnc1(5, 6)).to.be.revertedWith(
        "X must greater than 10"
      );
    });

    it("Should return expected results", async () => {
      expect(await contract.fnc1(11, 6)).to.be.deep.equal([
        ethers.BigNumber.from(10),
        ethers.BigNumber.from(17),
        false,
        "X>=Y",
      ]);
    });

    it("Should revert if input Y greater than 10", async () => {
      await expect(contract.fnc1(11, 11)).to.be.revertedWith(
        "Y must less than 10"
      );
    });

    it("Assert should revert txt if total X + Y less than 15", async () => {
      try {
        await contract.fnc1(11, 2);
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });
});

import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Caller, Callee, Selector } from "../typechain";

describe("Contract", () => {
  let deployer: SignerWithAddress,
    caller: Caller,
    callee: Callee,
    selector: Selector;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const Caller = await ethers.getContractFactory("Caller", deployer);
    caller = await Caller.deploy();
    await caller.deployed();

    const Callee = await ethers.getContractFactory("Callee", deployer);
    callee = await Callee.deploy();
    await callee.deployed();

    const Selector = await ethers.getContractFactory("Selector", deployer);
    selector = await Selector.deploy();
    await selector.deployed();
  });
  describe("Delegatecall", async () => {
    it("Should set var on caller", async () => {
      await caller.setVar(callee.address, { value: 100 });
      expect(await caller.sender()).to.eq(deployer.address);
      expect(await caller.value()).to.eq(100);
      expect(await callee.sender()).to.eq(ethers.constants.AddressZero);
      expect(await callee.value()).to.eq(0);
      await expect(caller.setVar(callee.address, { value: 10 }))
        .to.emit(caller, "CallerLog")
        .withArgs(deployer.address, 10, true);
    });
  });
  describe("Selector", async () => {
    it("Should return first 4 bytes of the sha3 hash of function", async () => {
      expect(await selector.getSelector("deposit()")).to.eq(
        web3.eth.abi.encodeFunctionSignature("deposit()")
      );
      expect(
        await selector.getSelector("myFunction(uint256,uint32[],bytes10,bytes)")
      ).to.eq(
        web3.eth.abi.encodeFunctionSignature(
          "myFunction(uint256,uint32[],bytes10,bytes)"
        )
      );
    });
  });
});

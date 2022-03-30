import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Caller, Callee } from "../typechain";

describe("Contract", () => {
  let deployer: SignerWithAddress, caller: Caller, callee: Callee;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();

    const Caller = await ethers.getContractFactory("Caller", deployer);
    caller = await Caller.deploy();
    await caller.deployed();

    const Callee = await ethers.getContractFactory("Callee", deployer);
    callee = await Callee.deploy();
    await callee.deployed();
  });
  describe("TestCase", async () => {
    it("Should set X", async () => {
      await caller.setX(callee.address, 10);
      expect(await callee.x()).to.eq(10);
    });
    it("Should set X from address", async () => {
      await caller.setXFromAddress(callee.address, 10);
      expect(await callee.x()).to.eq(10);
    });
    it("Should set X and send ether", async () => {
      await caller.setXAndSendEther(callee.address, 10, {
        value: 1000,
      });
      expect(await callee.x()).to.eq(10);
      expect(await callee.amount()).to.eq(1000);
    });
    it("Should emit success message", async () => {
      await expect(caller.tryCatchExternalCall(10))
        .to.emit(caller, "Log")
        .withArgs("try-catch func was called");
    });
    it("Should emit failed message", async () => {
      await expect(caller.tryCatchExternalCall(0))
        .to.emit(caller, "Log")
        .withArgs("external call failed");
    });
    it("Should set total to X", async () => {
      await caller.setTotalToX(callee.address, 10, 5);
      expect(await callee.x()).to.eq(15);
    });
  });
});

import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Receiver, Caller } from "../typechain";

describe("Call", () => {
  let deployer: SignerWithAddress,
    user: SignerWithAddress,
    caller: Caller,
    receiver: Receiver;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const Receiver = await ethers.getContractFactory("Receiver", deployer);
    receiver = await Receiver.deploy();
    await receiver.deployed();

    const Caller = await ethers.getContractFactory("Caller", deployer);
    caller = await Caller.deploy();
    await caller.deployed();
  });
  describe("TestCase", async () => {
    it("Should possible deposit to another contract", async () => {
      await caller.callDeposit(receiver.address, { value: 100 });
      expect(await receiver.getBalance()).to.be.equal(100);
      await expect(caller.callDeposit(receiver.address, { value: 10 }))
        .to.emit(caller, "ResLog")
        .withArgs(true, "0x");
    });

    it("Should possible be call the fallback function", async () => {
      await expect(caller.callFncNotExist(receiver.address))
        .to.emit(receiver, "RcLog")
        .withArgs(
          caller.address,
          ethers.BigNumber.from(0),
          "Fallback was called"
        );
    });
  });
});

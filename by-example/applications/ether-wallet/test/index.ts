import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Wallet } from "../typechain";

describe("Wallet", () => {
  let deployer: SignerWithAddress, caller: SignerWithAddress, wallet: Wallet;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const Wallet = await ethers.getContractFactory("Wallet", deployer);
    wallet = await Wallet.deploy();
    await wallet.deployed();
  });
  describe("TestCase", async () => {
    it("Should send eth to wallet", async () => {
      await wallet.deposit({ value: 10 });
      await wallet.connect(caller).deposit({ value: 10 });
      expect(await wallet.getBalance()).to.eq(20);
    });

    it("Only owner can withdraw", async () => {
      await wallet.deposit({ value: 10 });
      await wallet.connect(caller).deposit({ value: 10 });
      expect(await wallet.owner()).to.eq(deployer.address);

      try {
        await wallet.connect(caller).withdraw();
        expect.fail();
      } catch (error) {
        expect(error).to.be.instanceOf(Error, "only-owner can call this func");
      }
      await wallet.withdraw();
      expect(await wallet.getBalance()).to.eq(0);
    });
  });
});

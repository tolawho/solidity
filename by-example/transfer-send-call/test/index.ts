import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { SendEther, ReceiveEther, NoReceiveFunc } from "../typechain";

describe("Greeter", () => {
  let deployer: SignerWithAddress,
    caller: SignerWithAddress,
    receiveEther: ReceiveEther,
    sendEther: SendEther,
    noReceiveFunc: NoReceiveFunc;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const SendEther = await ethers.getContractFactory("SendEther", deployer);
    sendEther = await SendEther.deploy();
    await sendEther.deployed();

    const ReceiveEther = await ethers.getContractFactory(
      "ReceiveEther",
      deployer
    );
    receiveEther = await ReceiveEther.deploy({ value: 10 });
    await receiveEther.deployed();

    const NoReceiveFunc = await ethers.getContractFactory(
      "NoReceiveFunc",
      deployer
    );
    noReceiveFunc = await NoReceiveFunc.deploy();
    await noReceiveFunc.deployed();
  });
  describe("TestCase", async () => {
    it("use transfer to send ether success", async () => {
      await sendEther.viaTransfer(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });
    it("use transfer to send ether failed", async () => {
      await ethers.provider.send("hardhat_setBalance", [caller.address, "0x0"]);
      try {
        sendEther
          .connect(caller)
          .viaTransfer(receiveEther.address, { value: 100 });
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });

    it("use transfer to send ether success via fallback", async () => {
      await sendEther.viaTransfer(noReceiveFunc.address, { value: 10 });
      expect(await noReceiveFunc.getBalance()).to.be.equal(10);
      await expect(
        sendEther.viaTransfer(noReceiveFunc.address, { value: 10 })
      ).to.emit(noReceiveFunc, "Log");
    });

    it("use send to send ether success", async () => {
      await sendEther.viaSend(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });

    it("use send to send ether failed", async () => {
      await ethers.provider.send("hardhat_setBalance", [caller.address, "0x0"]);
      try {
        sendEther.connect(caller).viaSend(receiveEther.address, { value: 100 });
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
    it("use send to send ether success via fallback", async () => {
      await sendEther.viaSend(noReceiveFunc.address, { value: 10 });
      expect(await noReceiveFunc.getBalance()).to.be.equal(10);
      await expect(
        sendEther.viaSend(noReceiveFunc.address, { value: 10 })
      ).to.emit(noReceiveFunc, "Log");
    });

    it("use call to send ether success", async () => {
      await sendEther.viaCall(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });

    it("use call to send ether failed via call", async () => {
      await ethers.provider.send("hardhat_setBalance", [caller.address, "0x0"]);
      try {
        sendEther.connect(caller).viaCall(receiveEther.address, { value: 100 });
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
    it("use call to send ether success via fallback", async () => {
      await sendEther.viaCall(noReceiveFunc.address, { value: 10 });
      expect(await noReceiveFunc.getBalance()).to.be.equal(10);
      await expect(
        sendEther.viaCall(noReceiveFunc.address, { value: 10 })
      ).to.emit(noReceiveFunc, "Log");
    });
  });
});

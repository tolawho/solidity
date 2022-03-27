import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { SendEther, ReceiveEther } from "../typechain";

describe("Greeter", () => {
  let deployer: SignerWithAddress,
    caller: SignerWithAddress,
    receiveEther: ReceiveEther,
    sendEther: SendEther;
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
  });
  describe("TestCase", async () => {
    it("send ether success via transfer", async () => {
      await sendEther.viaTransfer(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });
    it("send ether failed via transfer", async () => {
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

    it("send ether success via send", async () => {
      await sendEther.viaSend(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });

    it("send ether failed via transfer", async () => {
      await ethers.provider.send("hardhat_setBalance", [caller.address, "0x0"]);
      try {
        sendEther.connect(caller).viaSend(receiveEther.address, { value: 100 });
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });

    it("send ether success via call", async () => {
      await sendEther.viaCall(receiveEther.address, { value: 10 });
      expect(await receiveEther.getBalance()).to.be.equal(20);
    });

    it("send ether failed via call", async () => {
      await ethers.provider.send("hardhat_setBalance", [caller.address, "0x0"]);
      try {
        sendEther.connect(caller).viaCall(receiveEther.address, { value: 100 });
        expect.fail();
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });
});

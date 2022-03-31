import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Counter, MyCounter, MyUniswap } from "../typechain";

describe("Interface Test - Cross Contract Call", () => {
  let deployer: SignerWithAddress,
    caller: SignerWithAddress,
    counter: Counter,
    myCounter: MyCounter,
    myUniswap: MyUniswap;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter", deployer);
    counter = await Counter.deploy();
    await counter.deployed();

    const MyCounter = await ethers.getContractFactory("MyCounter", deployer);
    myCounter = await MyCounter.deploy();
    await myCounter.deployed();

    const MyUniswap = await ethers.getContractFactory("MyUniswap", deployer);
    myUniswap = await MyUniswap.deploy();
    await myUniswap.deployed();
  });

  describe("Counter", async () => {
    it("Should return the count default value {0}", async () => {
      expect(
        await myCounter.connect(caller).getCount(counter.address)
      ).to.be.equal(0);
    });

    it("Should be possible increment the count state", async () => {
      await myCounter.connect(caller).incrementCounter(counter.address);
      expect(
        await myCounter.connect(caller).getCount(counter.address)
      ).to.be.equal(1);
    });
  });

  describe("Uniswap", async () => {
    it.skip("", async () => {
      const x = await myUniswap.connect(caller).getTokenReserves();
      console.log(x);
    });
  });
});

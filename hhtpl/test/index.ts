import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Greeter } from "../typechain";

describe("Greeter",  () => {
  let deployer, user: SignerWithAddress, contract: Greeter;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "Greeter",
      deployer
    );
    contract = await Contract.deploy("Hello, world!");
    await contract.deployed();
  });
  describe("TestCase", async () => {
    it("Should return the new greeting once it's changed", async function () {

      expect(await contract.greet()).to.equal("Hello, world!");

      const setGreetingTx = await contract.setGreeting("Hola, mundo!");

      // wait until the transaction is mined
      await setGreetingTx.wait();

      expect(await contract.greet()).to.equal("Hola, mundo!");
    });
  });

});

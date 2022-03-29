import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Greeter } from "../typechain";

describe("Greeter",  () => {
  let deployer: SignerWithAddress, caller: SignerWithAddress, contract: Greeter;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "Greeter",
      deployer
    );
    contract = await Contract.deploy("Hello, world!");
    await contract.deployed();
  });
  describe("TestCase", async () => {
    it("Should ...", async () => {});
  });

});

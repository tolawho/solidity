import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { ERC721 } from "../typechain";

describe("ERC721", () => {
  let deployer: SignerWithAddress, caller: SignerWithAddress, contract: ERC721;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("ERC721", deployer);
    contract = await Contract.deploy();
    await contract.deployed();
  });
  describe("TestCase", async () => {
    it("Should ...", async () => {});
  });
});

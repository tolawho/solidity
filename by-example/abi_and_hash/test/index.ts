import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { MyContract } from "../typechain";

describe("MyContract", () => {
  let deployer: SignerWithAddress,
    signer: SignerWithAddress,
    myContract: MyContract;
  beforeEach(async () => {
    [deployer, signer] = await ethers.getSigners();
    const MyContract = await ethers.getContractFactory("MyContract", deployer);
    myContract = await MyContract.deploy();
    await myContract.deployed();
  });
  describe("TestCase", async () => {
    it("Should be possible encode and decode", async () => {
      const data = await myContract.encode(
        deployer.address,
        10,
        false,
        [1, 2],
        "abi_encode_decode"
      );

      expect(await myContract.decode(data)).to.be.deep.equal([
        deployer.address,
        ethers.BigNumber.from(10),
        false,
        [ethers.BigNumber.from(1), ethers.BigNumber.from(2)],
        "abi_encode_decode",
      ]);
    });
    it("", async () => {
      const answer = await myContract.hashStr("initial-answer");
      await myContract.setAnswer(answer);
      await myContract.connect(signer).guess("initial-answer");
      expect(await myContract.winner()).to.eq(signer.address);
    });
  });
});

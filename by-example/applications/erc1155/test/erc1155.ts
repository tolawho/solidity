import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { WorldOfPolygon } from "../typechain";

describe("ERC721", () => {
  let deployer: SignerWithAddress, wop: WorldOfPolygon;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const WOP = await ethers.getContractFactory("WorldOfPolygon", deployer);
    wop = await WOP.deploy(
      "WorldOfPolygon",
      "WoP",
      "https://ipfs.io/ipfs/QmVVDWVmNBrgJMwaYmATqBjqbPe9iD1iZzzs91d5khyHCm/"
    );
    await wop.deployed();

    console.log("WorldOfPolygon deployed to:", wop.address);

    await wop.mint(20).then(async () => console.log(await wop.uri(1)));
    await wop.mint(18).then(async () => console.log(await wop.uri(2)));
    await wop.mint(15).then(async () => console.log(await wop.uri(3)));
    await wop.mint(15).then(async () => console.log(await wop.uri(4)));
    await wop.mint(10).then(async () => console.log(await wop.uri(5)));
    await wop.mint(10).then(async () => console.log(await wop.uri(6)));
    await wop.mint(5).then(async () => console.log(await wop.uri(7)));
    await wop.mint(5).then(async () => console.log(await wop.uri(8)));
    await wop.mint(1).then(async () => console.log(await wop.uri(9)));
    await wop.mint(1).then(async () => console.log(await wop.uri(10)));
  });
  describe("TestCase", async () => {
    it("Should ...", async () => {});
  });
});

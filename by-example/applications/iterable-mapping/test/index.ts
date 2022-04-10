import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { IterableMap } from "../typechain";

describe("IterableMap", () => {
  let deployer: SignerWithAddress,
    member1: SignerWithAddress,
    member2: SignerWithAddress,
    member3: SignerWithAddress,
    member4: SignerWithAddress,
    member5: SignerWithAddress,
    map: IterableMap;
  beforeEach(async () => {
    [deployer, member1, member2, member3, member4, member5] =
      await ethers.getSigners();
    const IterableMapping = await ethers.getContractFactory("IterableMapping");
    const iterableMapping = await IterableMapping.deploy();

    const Contract = await ethers.getContractFactory("IterableMap", {
      signer: deployer,
      libraries: {
        IterableMapping: iterableMapping.address,
      },
    });
    map = await Contract.deploy();
    await map.deployed();
  });

  describe("TestCase", async () => {
    it("Should set new member", async () => {
      await map.set(member1.address, 1);
      expect(await map.size()).to.eq(1);
      expect(await map.getKeys()).to.include.members([member1.address]);
      expect(await map.getValues()).to.deep.equal([ethers.BigNumber.from(1)]);
    });

    it("Should update value of inserted record", async () => {
      await map.set(member1.address, 1);
      await map.set(member1.address, 100);
      expect(await map.size()).to.eq(1);
      expect(await map.getKeys()).to.include.members([member1.address]);
      expect(await map.getValues()).to.deep.equal([ethers.BigNumber.from(100)]);
    });

    it("Should remove member", async () => {
      await map.set(member1.address, 15);
      await map.set(member2.address, 11);
      await map.set(member3.address, 1);
      await map.set(member4.address, 2);
      await map.set(deployer.address, 10);
      await map.set(member5.address, 30);

      await map.remove(deployer.address);

      expect(await map.size()).to.eq(5);
      expect(await map.getKeys()).to.include.members([
        member1.address,
        member2.address,
        member3.address,
        member4.address,
        member5.address,
      ]);
      expect(await map.getValues()).to.deep.equal([
        ethers.BigNumber.from(15),
        ethers.BigNumber.from(11),
        ethers.BigNumber.from(1),
        ethers.BigNumber.from(2),
        ethers.BigNumber.from(30),
      ]);
    });
  });
});

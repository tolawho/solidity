import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { FuncPureViewError } from "../typechain";

describe("FuncPureViewError", () => {
  let deployer: SignerWithAddress,
    newOwner: SignerWithAddress,
    contract: FuncPureViewError;
  beforeEach(async () => {
    [deployer, newOwner] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory(
      "FuncPureViewError",
      deployer
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  describe("TestCase", async () => {
    describe("Fnc-View-Pure-Error", async () => {
      it("Should revert if input x less than 10", async () => {
        await expect(contract.fnc1(5, 6)).to.be.revertedWith(
          "X must greater than 10"
        );
      });

      it("Should return expected results", async () => {
        expect(await contract.fnc1(11, 6)).to.be.deep.equal([
          ethers.BigNumber.from(10),
          ethers.BigNumber.from(17),
          false,
          "X>=Y",
        ]);
      });

      it("Should revert if input Y greater than 10", async () => {
        await expect(contract.fnc1(11, 11)).to.be.revertedWith(
          "Y must less than 10"
        );
      });

      it("Assert should revert txt if total X + Y less than 15", async () => {
        try {
          await contract.fnc1(11, 2);
          expect.fail();
        } catch (error) {
          expect(error).to.be.an.instanceOf(Error);
        }
      });
    });
    describe("Modifier", async () => {
      it("Should be possible change the owner", async () => {
        await contract.changeOwner(newOwner.address);
        expect(await contract.owner()).to.be.equal(newOwner.address);
      });

      it("Should not be possible change the owner to zero-address", async () => {
        await expect(
          contract.changeOwner("0x0000000000000000000000000000000000000000")
        ).to.be.revertedWith("Not valid address");
      });

      it("Should not be possible change the owner if not the owner", async () => {
        await expect(
          contract.connect(newOwner).changeOwner(newOwner.address)
        ).to.be.revertedWith("Not owner");
      });

      it("Should be revert with message No reentrancy", async () => {
        contract.decrement(1);
        setTimeout(async () => {
          await expect(contract.decrement(1)).to.be.revertedWith(
            "No reentrancy"
          );
        }, 1000);
      });
    });
  });
});

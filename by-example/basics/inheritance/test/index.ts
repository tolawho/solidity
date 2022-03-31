import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { X, Y, A, B, C, D, E } from "../typechain";

describe("Inheritance", () => {
  let deployer: SignerWithAddress,
    contractX: X,
    contractY: Y,
    contractA: A,
    contractB: B,
    contractC: C,
    contractD: D,
    contractE: E;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const ContractX = await ethers.getContractFactory("X", deployer);
    contractX = await ContractX.deploy("Contract X");
    await contractX.deployed();

    const ContractY = await ethers.getContractFactory("Y", deployer);
    contractY = await ContractY.deploy("Hello from Y");
    await contractY.deployed();

    const ContractA = await ethers.getContractFactory("A", deployer);
    contractA = await ContractA.deploy();
    await contractA.deployed();

    const ContractB = await ethers.getContractFactory("B", deployer);
    contractB = await ContractB.deploy("Contract B", "Hello from B");
    await contractB.deployed();

    const ContractC = await ethers.getContractFactory("C", deployer);
    contractC = await ContractC.deploy();
    await contractC.deployed();

    const ContractD = await ethers.getContractFactory("D", deployer);
    contractD = await ContractD.deploy();
    await contractD.deployed();

    const ContractE = await ethers.getContractFactory("E", deployer);
    contractE = await ContractE.deploy();
    await contractE.deployed();
  });
  describe("Test case", async () => {
    it("Should return override value", async () => {
      expect(await contractA.getName()).to.be.equal("A Contract(override)");
      expect(await contractA.getText()).to.be.equal("Hello from A(override)");

      expect(await contractE.getName()).to.be.equal("Contract E");
      expect(await contractE.getText()).to.be.equal("Hello from E");
    });

    it("Should return value of overridden parent function", async () => {
      expect(await contractB.getName()).to.be.equal("A Contract(override)");
      expect(await contractB.getText()).to.be.equal("Hello from A(override)");
    });

    it("Should return initial value", async () => {
      expect(await contractC.getName()).to.be.equal("C Contract");
      expect(await contractC.getText()).to.be.equal("Hello from C");

      expect(await contractD.getName()).to.be.equal("D Contract");
      expect(await contractD.getText()).to.be.equal("Hello from D");
    });
  });
});

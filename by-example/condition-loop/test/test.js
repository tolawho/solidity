const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConditionLoop", () => {
  let deployer, sender, contract;
  beforeEach(async () => {
    [deployer, sender] = await ethers.getSigners();
    const ConditionLoop = await ethers.getContractFactory(
      "ConditionLoop",
      deployer
    );
    contract = await ConditionLoop.deploy();
    await contract.deployed();
  });

  describe("Conditions", () => {
    describe("If Else", () => {
      it("Input number less than 10", async () => {
        expect(await contract.ifElse(8)).to.be.equal("Less than 10");
      });
      it("Input number less than 20", async () => {
        expect(await contract.ifElse(10)).to.be.equal("Less than 20");
      });
      it("Input number equal to 20", async () => {
        expect(await contract.ifElse(20)).to.be.equal(
          "Greater than or equal to 20"
        );
      });
      it("Input number greater than 20", async () => {
        expect(await contract.ifElse(21)).to.be.equal(
          "Greater than or equal to 20"
        );
      });
      it("Should be throw an error when input a string", async () => {
        try {
          await contract.ifElse("a string");
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("invalid BigNumber string");
        }
      });
      it("Should be throw an error when input a negative number", async () => {
        try {
          await contract.ifElse(-1);
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("value out-of-bounds");
        }
      });
    });
    describe("Ternary", () => {
      it("Input number less than 10", async () => {
        expect(await contract.ternary(8)).to.be.equal("Less than 10");
      });
      it("Input number equal to 10", async () => {
        expect(await contract.ternary(10)).to.be.equal(
          "Greater than or equal to 10"
        );
      });
      it("Input number greater than 10", async () => {
        expect(await contract.ternary(11)).to.be.equal(
          "Greater than or equal to 10"
        );
      });
      it("Should be throw an error when input a string", async () => {
        try {
          await contract.ifElse("a string");
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
        }
      });
      it("Should be throw an error when input a negative number", async () => {
        try {
          await contract.ifElse(-1);
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("value out-of-bounds");
        }
      });
    });
  });
  describe("Loop", () => {
    describe("For", () => {
      it("Should return 5 when input 0", async () => {
        expect(await contract.forLoop(0)).to.be.equal(0);
      });
      it("Should return 5 when input number greater than 10", async () => {
        expect(await contract.forLoop(11)).to.be.equal(5);
      });
      it("Should return number less than 10 when input number less than or equal 10", async () => {
        let number = 10;
        expect(await contract.forLoop(number)).to.be.equal(number);
      });
      it("Should be throw an error when input a string", async () => {
        try {
          await contract.forLoop("a string");
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
        }
      });
      it("Should be throw an error when input a negative number", async () => {
        try {
          await contract.forLoop(-1);
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("value out-of-bounds");
        }
      });
    });
    describe("Do-While", () => {
      it("Should return input number", async () => {
        let number = 10;
        expect(await contract.doWhile(number)).to.be.equal(number);
      });
      it("Should be throw an error when input a string", async () => {
        try {
          await contract.doWhile("a string");
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
        }
      });
      it("Should be throw an error when input a negative number", async () => {
        try {
          await contract.doWhile(-1);
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("value out-of-bounds");
        }
      });
    });
    describe("While-Do", () => {
      it("Should return input number", async () => {
        let number = 10;
        expect(await contract.whileDo(number)).to.be.equal(number);
      });
      it("Should be throw an error when input a string", async () => {
        try {
          await contract.whileDo("a string");
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
        }
      });
      it("Should be throw an error when input a negative number", async () => {
        try {
          await contract.whileDo(-1);
          expect.fail();
        } catch (error) {
          expect(error.code).to.be.equal("INVALID_ARGUMENT");
          expect(error.reason).to.be.equal("value out-of-bounds");
        }
      });
    });
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", () => {
  let deployer, sender, contract;
  beforeEach(async () => {
    [deployer, sender, addr1, addr2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("Maes", deployer);
    contract = await Contract.deploy();
    await contract.deployed();
  });
  describe("Mapping", () => {
    describe("Single", () => {
      it("Should return default value{0} of defined index", async () => {
        expect(await contract.get(addr2.address)).to.be.equal(0);
      });

      it("Should set mapping address", async () => {
        expect(await contract.set(addr1.address, 10)).to.be.ok;
      });

      it("Should return map value", async () => {
        await contract.set(addr1.address, 10);
        expect(await contract.get(addr1.address)).to.be.equal(10);
      });

      it("Should reset value to the default value", async () => {
        await contract.set(addr1.address, 10);
        await contract.remove(addr1.address);
      });
    });
    describe("Nested", () => {
      it("Should set the value", async () => {
        expect(await contract.setNested(addr1.address, 10, true)).to.be.ok;
      });

      it("Should return default value{false} of undefine item", async () => {
        expect(await contract.getNested(addr1.address, 10)).to.be.false;
      });

      it("Should return the value of defined item", async () => {
        await contract.setNested(addr1.address, 10, true);
        expect(await contract.getNested(addr1.address, 10)).to.be.true;
      });

      it("Should reset value to the default value", async () => {
        await contract.setNested(addr1.address, 10, true);
        await contract.removeNested(addr1.address, 10);
        expect(await contract.getNested(addr1.address, 10)).to.be.false;
      });
    });
  });
  describe("Array", () => {
    it("Should return length of array", async () => {
      expect(await contract.getLengthOfArray()).to.be.equal(0);
    });

    it("Should revered with message index out of bound when try access the value of undefined index", async () => {
      let length = await contract.getLengthOfArray();
      await expect(contract.getArrayItem(length + 1)).to.be.revertedWith(
        "index out of bound"
      );
    });

    it("Should be possible add item to array", async () => {
      await contract.pushArrayItem(10);
      let length = await contract.getLengthOfArray();
      expect(length).to.be.equal(1);
    });

    it("Should be possible remove item from array", async () => {
      await contract.pushArrayItem(10);
      expect(await contract.getLengthOfArray()).to.be.equal(1);
      await contract.popArrayItem();
      expect(await contract.getLengthOfArray()).to.be.equal(0);
    });

    it("Should return the value of defined index", async () => {
      await contract.pushArrayItem(10);
      let length = await contract.getLengthOfArray();
      expect(await contract.getArrayItem(length - 1)).to.be.equal(10);
    });

    it("Should revered with message index out of bound when try remove undefined index", async () => {
      let length = await contract.getLengthOfArray();
      await expect(contract.removeArrayItem(length + 1)).to.be.revertedWith(
        "index out of bound"
      );
    });

    it("Should be possible remove an item of defined index", async () => {
      await contract.pushArrayItem(10);
      let length = await contract.getLengthOfArray();
      await contract.removeArrayItem(length - 1);
      expect(await contract.getLengthOfArray()).to.be.equal(length);
      expect(await contract.getArrayItem(length - 1)).to.be.equal(0);
    });

    it("Array remove by shifting", async () => {
      await contract.pushArrayItem(1);
      await contract.pushArrayItem(10);
      await contract.pushArrayItem(13);
      await contract.pushArrayItem(14);
      await contract.pushArrayItem(234);
      expect(await contract.getLengthOfArray()).to.be.equal(5);
      await contract.removeArrayByShifting(2);
      expect(await contract.getLengthOfArray()).to.be.equal(4);
    });

    it("Should revered with message index out of bound", async () => {
      await contract.pushArrayItem(1);
      await contract.pushArrayItem(10);
      await contract.pushArrayItem(13);
      await contract.pushArrayItem(14);
      await contract.pushArrayItem(234);
      expect(await contract.getLengthOfArray()).to.be.equal(5);
      await expect(contract.removeArrayByShifting(5)).to.be.revertedWith(
        "index out of bound"
      );
    });
  });
  describe("Enum", () => {
    it("Should return the default value", async () => {
      expect(await contract.getShippingStatus()).to.be.equal(0);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Pending");
    });

    it("Should be possible to change status", async () => {
      await contract.setShippingStatus(1);
      expect(await contract.getShippingStatus()).to.be.equal(1);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Shipped");

      await contract.setShippingStatus(2);
      expect(await contract.getShippingStatus()).to.be.equal(2);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Accepted");

      await contract.setShippingStatus(3);
      expect(await contract.getShippingStatus()).to.be.equal(3);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Rejected");

      await contract.setShippingStatus(4);
      expect(await contract.getShippingStatus()).to.be.equal(4);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Canceled");
    });

    it("Should be possible to cancel or reset", async () => {
      await contract.doCancel();
      expect(await contract.getShippingStatus()).to.be.equal(4);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Canceled");

      await contract.doReset();
      expect(await contract.getShippingStatus()).to.be.equal(0);
      expect(await contract.getShippingStatusDetail()).to.be.equal("Pending");
    });
  });
  describe("Structs", () => {
    it("Create todo by three ways initialize a struct", async () => {
      await contract.createTodo("Way 1", 1);
      await contract.createTodo("Way 2", 2);
      await contract.createTodo("Way 3", 3);
      expect(await contract.getTodoLength()).to.be.equal(3);
    });

    it("Should return todo", async () => {
      await contract.createTodo("Way 1", 1);
      expect(await contract.getTodo(0)).to.deep.equal(["Way 1", false]);
    });

    it("Should return todo length", async () => {
      await contract.createTodo("Way 1", 1);
      expect(await contract.getTodoLength()).to.equal(1);
    });

    it("Should be possible to update todo", async () => {
      await contract.createTodo("Way 1", 1);
      await contract.updateTodo(0, "Updated");
      expect(await contract.getTodo(0)).to.deep.equal(["Updated", false]);
    });

    it("Should be possible to update todo complete", async () => {
      await contract.createTodo("Todo 1", 1);
      expect(await contract.getTodo(0)).to.deep.equal(["Todo 1", false]);
      await contract.toggleTodo(0);
      expect(await contract.getTodo(0)).to.deep.equal(["Todo 1", true]);
    });
  });
});

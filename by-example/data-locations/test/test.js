const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataLocations", () => {
  let deployer, user1, user2, contract;
  beforeEach(async () => {
    [deployer, user1, user2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("DataLocations", deployer);
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be possible to create todo", async () => {
    await contract.connect(user1).create("task 1");
    expect(await contract.connect(user1).count()).to.be.equal(1);
  });

  it("Should return the list todo", async () => {
    await contract.connect(user1).create("task 1");
    await contract.connect(user1).create("task 2");
    await contract.connect(user1).create("task 3");
    expect(await contract.connect(user1).count()).to.be.equal(3);
    let todos = await contract.connect(user1).get();
    expect(todos[0]).to.include.members(["task 1", false]);
    expect(todos[1]).to.include.members(["task 2", false]);
    expect(todos[2]).to.include.members(["task 3", false]);
  });

  it("Should be possible to update the list todo", async () => {
    await contract.connect(user1).create("task 1");
    await contract.connect(user1).create("task 2");
    await contract.connect(user1).create("task 3");
    await contract.connect(user1).update(0, "task 1 updated");

    let todos = await contract.connect(user1).get();
    expect(todos[0]).to.include.members(["task 1 updated", false]);
    expect(todos[1]).to.include.members(["task 2", false]);
    expect(todos[2]).to.include.members(["task 3", false]);
  });

  it("Should be possible toggle completed", async () => {
    await contract.connect(user1).create("task 1");
    await contract.connect(user1).toggleCompleted(0);
    let todos = await contract.connect(user1).get();
    expect(todos[0]).to.include.members(["task 1", true]);
  });

  it("Should return the picked list of todo", async () => {
    await contract.connect(user1).create("task 1");
    await contract.connect(user1).create("task 2");
    await contract.connect(user1).create("task 3");
    await contract.connect(user1).toggleCompleted(0);
    let pick = await contract.connect(user1).externalCall();
    console.log(pick);
  });
});

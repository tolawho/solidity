import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { MyToken, TokenSwap } from "../typechain";

describe("Tokenswap", async () => {
  let deployer: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    tokenSwap: TokenSwap,
    aliceToken: MyToken,
    bobToken: MyToken;
  beforeEach(async () => {
    [deployer, alice, bob] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken", deployer);

    aliceToken = await MyToken.deploy("Alice Token", "ALTN");
    await aliceToken.deployed();
    bobToken = await MyToken.deploy("Bob Token", "BOTN");
    await bobToken.deployed();

    const TokenSwap = await ethers.getContractFactory("TokenSwap", deployer);
    tokenSwap = await TokenSwap.deploy();
    await tokenSwap.deployed();
  });

  it("Should be possible swap token", async () => {
    await aliceToken.transfer(alice.address, web3.utils.toWei("10"));
    await bobToken.transfer(bob.address, web3.utils.toWei("10"));

    expect(await aliceToken.balanceOf(alice.address)).to.eq(
      web3.utils.toWei("10")
    );
    expect(await bobToken.balanceOf(bob.address)).to.eq(web3.utils.toWei("10"));

    const aliceApproveTx = await aliceToken
      .connect(alice)
      .approve(tokenSwap.address, web3.utils.toWei("2"));
    await aliceApproveTx.wait();

    const bobApproveTx = await bobToken
      .connect(bob)
      .approve(tokenSwap.address, web3.utils.toWei("1"));
    await bobApproveTx.wait();

    await tokenSwap.connect(alice).swap(
      aliceToken.address,
      web3.utils.toWei("2"), // ALTN token
      bobToken.address,
      bob.address,
      web3.utils.toWei("1") // BOTN token
    );

    expect(await aliceToken.balanceOf(bob.address)).to.eq(
      web3.utils.toWei("2")
    );
    expect(await aliceToken.balanceOf(alice.address)).to.eq(
      web3.utils.toWei("8")
    );
    expect(await bobToken.balanceOf(alice.address)).to.eq(
      web3.utils.toWei("1")
    );
    expect(await bobToken.balanceOf(bob.address)).to.eq(web3.utils.toWei("9"));
  });

  it("Should be reverted if token 1 approve lower than necessary token", async () => {
    await aliceToken.transfer(alice.address, web3.utils.toWei("10"));
    await bobToken.transfer(bob.address, web3.utils.toWei("10"));

    expect(await aliceToken.balanceOf(alice.address)).to.eq(
      web3.utils.toWei("10")
    );
    expect(await bobToken.balanceOf(bob.address)).to.eq(web3.utils.toWei("10"));

    const aliceApproveTx = await aliceToken
      .connect(alice)
      .approve(tokenSwap.address, web3.utils.toWei("1"));
    await aliceApproveTx.wait();

    const bobApproveTx = await bobToken
      .connect(bob)
      .approve(tokenSwap.address, web3.utils.toWei("1"));
    await bobApproveTx.wait();

    await expect(
      tokenSwap.connect(alice).swap(
        aliceToken.address,
        web3.utils.toWei("2"), // ALTN token
        bobToken.address,
        bob.address,
        web3.utils.toWei("1") // BOTN token
      )
    ).to.revertedWith("Token 1 allowance too low");
  });

  it("Should be reverted if token 2 approve lower than necessary token", async () => {
    await aliceToken.transfer(alice.address, web3.utils.toWei("10"));
    await bobToken.transfer(bob.address, web3.utils.toWei("10"));

    expect(await aliceToken.balanceOf(alice.address)).to.eq(
      web3.utils.toWei("10")
    );
    expect(await bobToken.balanceOf(bob.address)).to.eq(web3.utils.toWei("10"));

    const aliceApproveTx = await aliceToken
      .connect(alice)
      .approve(tokenSwap.address, web3.utils.toWei("2"));
    await aliceApproveTx.wait();

    const bobApproveTx = await bobToken
      .connect(bob)
      .approve(tokenSwap.address, web3.utils.toWei("3"));
    await bobApproveTx.wait();

    await expect(
      tokenSwap.connect(alice).swap(
        aliceToken.address,
        web3.utils.toWei("2"), // ALTN token
        bobToken.address,
        bob.address,
        web3.utils.toWei("5") // BOTN token
      )
    ).to.revertedWith("Token 2 allowance too low");
  });
});

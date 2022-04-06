import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { MyToken } from "../typechain";
import { parseEther } from "ethers/lib/utils";

describe("MyToken", async () => {
  let deployer: SignerWithAddress,
    spender1: SignerWithAddress,
    spender2: SignerWithAddress,
    myToken: MyToken;
  beforeEach(async () => {
    [deployer, spender1, spender2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken", deployer);
    myToken = await MyToken.deploy("My First Token", "MFT");
    await myToken.deployed();
  });

  it("Should return the name of the token & symbol", async () => {
    expect(await myToken.name()).to.eq("My First Token");
    expect(await myToken.symbol()).to.eq("MFT");
  });
  it("Should return the decimals number of the token", async () => {
    expect(await myToken.decimals()).to.eq(18);
  });
  it("Should return the total supply of the token", async () => {
    expect(await myToken.totalSupply()).to.eq(parseEther("1000"));
    expect(await myToken.totalSupply()).to.eq(web3.utils.toWei("1000"));
  });
  it("Should return the total supply of the token", async () => {
    expect(await myToken.totalSupply()).to.eq(parseEther("1000"));
    expect(await myToken.totalSupply()).to.eq(web3.utils.toWei("1000"));
  });
  it("Should return the amount of tokens owned by account", async () => {
    expect(await myToken.balanceOf(spender1.address)).to.eq(0);
    expect(await myToken.balanceOf(spender2.address)).to.eq(0);
    expect(await myToken.balanceOf(deployer.address)).to.eq(
      web3.utils.toWei("1000")
    );
  });
  it("Should be possible transfer token to another account", async () => {
    expect(await myToken.balanceOf(spender2.address)).to.eq(0);
    expect(await myToken.balanceOf(deployer.address)).to.eq(
      web3.utils.toWei("1000")
    );

    expect(await myToken.balanceOf(spender1.address)).to.eq(0);
    await myToken.transfer(spender1.address, web3.utils.toWei("10"));
    expect(await myToken.balanceOf(spender1.address)).to.eq(
      web3.utils.toWei("10")
    );
    expect(await myToken.balanceOf(deployer.address)).to.eq(
      web3.utils.toWei("990")
    );

    // spender 1 send token to spender2
    await myToken
      .connect(spender1)
      .transfer(spender2.address, web3.utils.toWei("1"));
    expect(await myToken.balanceOf(spender1.address)).to.eq(
      web3.utils.toWei("9")
    );
    expect(await myToken.balanceOf(spender2.address)).to.eq(
      web3.utils.toWei("1")
    );

    // test emit event when transfer
    await expect(
      myToken
        .connect(spender1)
        .transfer(spender2.address, web3.utils.toWei("1"))
    )
      .to.emit(myToken, "Transfer")
      .withArgs(spender1.address, spender2.address, web3.utils.toWei("1"));
  });

  // TODO test approve func

  it("Should return the  owner", async () => {
    expect(await myToken.owner()).to.eq(deployer.address);
  });

  it("Should remove the owner", async () => {
    await myToken.renounceOwnership();
    expect(await myToken.owner()).to.eq(ethers.constants.AddressZero);
  });

  it("Should be possible change the ownership", async () => {
    await myToken.transferOwnership(spender1.address);
    expect(await myToken.owner()).to.eq(spender1.address);
  });

  it("Should be throw an error with message 'Ownable: new owner is the zero address' if try transfer ownership to zero address", async () => {
    try {
      await myToken.transferOwnership(ethers.constants.AddressZero);
    } catch (error) {
      expect(error).to.be.instanceOf(
        Error,
        "Ownable: new owner is the zero address"
      );
    }
  });
});

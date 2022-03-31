import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { PayableContract } from "../typechain";

describe("PayableContract", () => {
  let deployer: SignerWithAddress,
    caller: SignerWithAddress,
    payableContract: PayableContract;
  beforeEach(async () => {
    [deployer, caller] = await ethers.getSigners();
    const PayableContract = await ethers.getContractFactory(
      "PayableContract",
      deployer
    );
    payableContract = await PayableContract.deploy({ value: 10 });
    await payableContract.deployed();
  });
  describe("TestCase", async () => {
    it("Owner should be deployer's address", async () => {
      expect(await payableContract.owner()).to.be.equal(deployer.address);
    });

    it("Should return the initial balance of contract", async () => {
      expect(await payableContract.getBalance()).to.be.equal(10);
    });

    it("Should be possible deposit to contract via payable function", async () => {
      await payableContract.connect(caller).deposit({ value: 1 });
      expect(await payableContract.getBalance()).to.be.equal(11);
    });

    // TODO how to test this case: deposit some ether to non-payable function
    it.skip("Should be throw an error if try send ether to non payable function", async () => {
      // await expect(
      //   await payableContract.connect(caller).nonPayable({ value: 1 })
      // ).to.be.revertedWith("");
    });

    it("Should be possible withdraw to the owner's address", async () => {
      // get balance by this method will return hex value
      // const callerBalance = await ethers.provider.send("eth_getBalance", [
      //   caller.address,
      // ]);
      // console.log(web3.utils.hexToNumberString(callerBalance));

      // deposit to contract
      await payableContract.connect(caller).deposit({ value: 20 });
      // const callerBalance = await web3.eth.getBalance(caller.address);
      const payableBalance = await payableContract.getBalance();
      expect(payableBalance).to.be.equal(30);

      // balance bignumber format
      const deployerBalanceBeforeInWei = await web3.eth.getBalance(
        deployer.address
      );
      console.log(deployerBalanceBeforeInWei);

      // convert from wei(bignumber) to ether
      const deployerBalanceBefore = web3.utils.fromWei(
        deployerBalanceBeforeInWei
      );
      const tx = await payableContract.withdraw();
      const deployerBalanceAfterInWei = await web3.eth.getBalance(
        deployer.address
      );
      const deployerBalanceAfter = web3.utils.fromWei(
        deployerBalanceAfterInWei
      );
      const gasPrice = ethers.BigNumber.from(tx.gasPrice);

      console.log(gasPrice);

      // TODO how to compare two bignumber, need compare owner's balance after + fees with balance before
      const gasLimit = ethers.BigNumber.from(tx.gasLimit);
      const fees = gasPrice.mul(gasLimit);
      const totalBalanceInWei = ethers.BigNumber.from(
        deployerBalanceAfterInWei
      ).add(fees);
      const totalBalance = ethers.utils.formatEther(totalBalanceInWei);
      const balanceGreaterThan = totalBalance > deployerBalanceBefore;
      console.log(totalBalance);
      console.log(balanceGreaterThan);

      console.log(`${deployerBalanceBefore} ETH`);
      console.log(`${deployerBalanceAfter} ETH`);
      // expect(balanceGreaterThan).to.be.true;

      expect(await payableContract.getBalance()).to.be.equal(0);
    });

    it("Should be possible transfer to a payable address", async () => {
      await payableContract.connect(deployer).deposit({ value: 100 });

      // set balance for caller
      await ethers.provider.send("hardhat_setBalance", [
        caller.address,
        web3.utils.toHex(0),
      ]);
      expect(await web3.eth.getBalance(caller.address)).to.be.equal("0");
      await payableContract.transfer(caller.address, 100);
      expect(await web3.eth.getBalance(caller.address)).to.be.equal("100");
    });

    it("Should be throw an error when transfer amount greater than balance", async () => {
      await payableContract.connect(deployer).deposit({ value: 90 });

      // set balance for caller
      await ethers.provider.send("hardhat_setBalance", [
        caller.address,
        web3.utils.toHex(0),
      ]);
      expect(await web3.eth.getBalance(caller.address)).to.be.equal("0");
      await expect(
        payableContract.transfer(caller.address, 150)
      ).to.be.revertedWith("failed to send ether");
    });
  });
});

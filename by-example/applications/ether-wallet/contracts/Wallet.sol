//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/**
Basic wallet.

- Anyone can send ETH.
- Only the owner can withdraw.
*/
contract Wallet {
	address public owner;

	enum Action {
		Deposit,
		Withdraw
	}

	constructor() {
		owner = payable(msg.sender);
	}

	modifier onlyOwner() {
		require(msg.sender == owner, "only-owner can call this func");
		_;
	}

	function deposit() external payable {}

	receive() external payable {}

	function withdraw() external onlyOwner {
		uint amount = address(this).balance;
		(bool success, ) = owner.call{ value: amount }("");
		require(success, "withdraw failed");
	}

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}

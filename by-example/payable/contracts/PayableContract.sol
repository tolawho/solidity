//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract PayableContract {
	address public owner;

	// payable contract can receive ether
	constructor() payable {
		owner = payable(msg.sender);
	}

	// function deposit ether to this contract
	// call this function with some ether
	// the balanace of this contract will be automatically updated
	function deposit() public payable {}

	// call this function with some ether
	// the function will throw an error
	function nonPayable() public {}

	// function will withdraw all balance from this contract
	function withdraw() public {
		// get amount of ehter stored in this contract
		uint amount = address(this).balance;

		// send all ether to the owner
		(bool success, ) = owner.call{ value: amount }("");
		require(success, "failed to send ether");
	}

	// fucntion will transfer ether to a payable address from input
	function transfer(address payable _to, uint _amount) public {
		(bool success, ) = _to.call{ value: _amount }("");
		require(success, "failed to send ether");
	}

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}

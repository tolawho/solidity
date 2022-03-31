//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract SendEther {
	function viaTransfer(address payable _to) public payable {
		_to.transfer(msg.value);
	}

	function viaSend(address payable _to) public payable {
		bool success = _to.send(msg.value);
		require(success, "failed to send ether");
	}

	function viaCall(address payable _to) public payable {
		(bool success, ) = _to.call{ value: msg.value }("");
		require(success, "faild to send ether");
	}
}

contract ReceiveEther {
	constructor() payable {}

	receive() external payable {}

	fallback() external payable {}

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}

contract NoReceiveFunc {
	event Log(uint gas);

	fallback() external payable {
		emit Log(gasleft());
	}

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}

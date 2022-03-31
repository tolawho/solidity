//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Callee {
	address public sender;
	uint public value;

	function setVar() public payable {
		sender = msg.sender;
		value = msg.value;
	}
}

contract Caller {
	address public sender;
	uint public value;

	event CallerLog(address indexed _sender, uint _value, bool _success);

	function setVar(address payable _addr) public payable {
		(bool success, ) = _addr.delegatecall(
			abi.encodeWithSignature("setVar()")
		);
		emit CallerLog(msg.sender, msg.value, success);
	}
}

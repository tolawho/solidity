//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./Import.sol";

contract Callee {
	uint public x;
	uint public amount;
	using SafeMath for uint;

	function setX(uint _x) public returns (uint) {
		x = _x;
		return x;
	}

	function setXandSendEther(uint _x) public payable returns (uint, uint) {
		x = _x;
		amount = msg.value;
		return (x, amount);
	}

	function testTryCatch(uint _x) public pure returns (string memory) {
		require(_x != 0, "require failed");
		return "try-catch func was called";
	}

	function setTotalToX(uint _x, uint _y) public {
		uint z = _x.add(_y);
		x = z;
	}
}

contract Caller {
	event Log(string msg);

	Callee public callee;

	constructor() {
		callee = new Callee();
	}

	function setX(Callee _callee, uint _x) public {
		_callee.setX(_x);
	}

	function setXFromAddress(address _addr, uint _x) public {
		Callee _callee = Callee(_addr);
		_callee.setX(_x);
	}

	function setXAndSendEther(Callee _callee, uint _x)
		public
		payable
		returns (uint, uint)
	{
		(uint x, uint amount) = _callee.setXandSendEther{ value: msg.value }(
			_x
		);
		return (x, amount);
	}

	function tryCatchExternalCall(uint _x) public {
		try callee.testTryCatch(_x) returns (string memory result) {
			emit Log(result);
		} catch {
			emit Log("external call failed");
		}
	}

	function setTotalToX(
		address _addr,
		uint _x,
		uint _y
	) public {
		Callee _callee = Callee(_addr);
		_callee.setTotalToX(_x, _y);
	}
}

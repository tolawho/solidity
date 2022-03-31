//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Receiver {
	event RcLog(address caller, uint amount, string msg);

	fallback() external payable {
		emit RcLog(msg.sender, msg.value, "Fallback was called");
	}

	function deposit(string memory _msg, uint _x)
		public
		payable
		returns (uint)
	{
		emit RcLog(msg.sender, msg.value, _msg);
		return _x + 1;
	}

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}

contract Caller {
	event ResLog(bool success, bytes data);

	function callDeposit(address payable _addr) public payable {
		(bool success, bytes memory data) = _addr.call{
			value: msg.value,
			gas: 5000
		}(abi.encodeWithSignature("deposit(string,uint)", "call deposit", 10));
		emit ResLog(success, data);
	}

	function callFncNotExist(address payable _addr) public {
		(bool success, bytes memory data) = _addr.call(
			abi.encodeWithSignature("doesNotExist()")
		);
		emit ResLog(success, data);
	}
}

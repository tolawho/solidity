//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract MyContract {
	bytes32 public answer;
	address public owner;
	address public winner;

	modifier onlyOwner() {
		require(owner == msg.sender, "only-owner can call this func");
		_;
	}

	constructor() {
		owner = msg.sender;
	}

	function encode(
		address _addr,
		uint _x,
		bool _bool,
		uint[] calldata _arr,
		string memory _txt
	) external pure returns (bytes memory) {
		return abi.encode(_addr, _x, _bool, _arr, _txt);
	}

	function decode(bytes calldata data)
		external
		pure
		returns (
			address,
			uint,
			bool,
			uint[] memory,
			string memory
		)
	{
		(address a, uint x, bool b, uint[] memory arr, string memory txt) = abi
			.decode(data, (address, uint, bool, uint[], string));
		return (a, x, b, arr, txt);
	}

	function setAnswer(bytes32 _answer) public onlyOwner {
		answer = _answer;
		winner = address(0);
	}

	function hashStr(string memory _answer) public pure returns (bytes32) {
		return keccak256(abi.encodePacked(_answer));
	}

	function guess(string memory _word) public returns (string memory) {
		bool isMatch = hashStr(_word) == answer;
		if (isMatch) {
			winner = msg.sender;
			return "you're winner";
		}
		return "try again";
	}
}

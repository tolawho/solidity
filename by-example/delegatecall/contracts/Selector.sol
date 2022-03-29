//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Selector {
	event Log(bytes indexed _abi);

	function getSelector(string memory _fnc) public pure returns (bytes4) {
		return bytes4(keccak256(bytes(_fnc)));
	}
}

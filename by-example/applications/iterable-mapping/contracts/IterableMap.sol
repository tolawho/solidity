// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./libraries/IterableMapping.sol";

contract IterableMap {
	using IterableMapping for IterableMapping.Map;

	IterableMapping.Map private members;

	function set(address _address, uint value) public {
		members.set(_address, value);
	}

	function remove(address _address) public {
		members.remove(_address);
	}

	function size() public view returns (uint) {
		return members.size();
	}

	function getKeys() public view returns (address[] memory) {
		return members.keys;
	}

	function getValues() public view returns (uint[] memory) {
		uint membersZise = members.size();
		uint[] memory ret = new uint[](members.size());
		for (uint index = 0; index < membersZise; index++) {
			ret[index] = members.values[members.getKeyAtIndex(index)];
		}
		return ret;
	}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library IterableMapping {
	struct Map {
		address[] keys;
		mapping(address => uint) values;
		mapping(address => uint) indexOf;
		mapping(address => bool) inserted;
	}

	// get values of key
	function get(Map storage map, address key) public view returns (uint) {
		return map.values[key];
	}

	function getKeyAtIndex(Map storage map, uint index)
		public
		view
		returns (address)
	{
		return map.keys[index];
	}

	function size(Map storage map) public view returns (uint) {
		return map.keys.length;
	}

	// check item inserted -> then update value only
	// else insert new record
	function set(
		Map storage map,
		address key,
		uint value
	) public {
		if (map.inserted[key]) {
			map.values[key] = value;
		} else {
			map.indexOf[key] = size(map);
			map.keys.push(key);
			map.values[key] = value;
			map.inserted[key] = true;
		}
	}

	function remove(Map storage map, address key) public {
		require(map.inserted[key], "item does not exist");

		delete map.inserted[key];
		delete map.values[key];

		uint index = map.indexOf[key];
		uint lastIndex = size(map) - 1;
		address lastKey = getKeyAtIndex(map, lastIndex);

		map.keys[index] = lastKey;
		map.keys.pop();
	}
}

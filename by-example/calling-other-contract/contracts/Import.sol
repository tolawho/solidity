//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

struct Point {
	uint x;
	uint y;
}

error Unauthorized(address sender);

library SafeMath {
	function add(uint x, uint y) internal pure returns (uint) {
		uint z = x + y;
		require(z >= x, "uint overflow");

		return z;
	}
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract Counter {
	uint256 public count;

	function inc() external {
		count += 1;
	}
}

interface ICounter {
	function count() external view returns (uint256);

	function inc() external;
}

contract MyCounter {
	function incrementCounter(address _counter) external {
		ICounter(_counter).inc();
	}

	function getCount(address _counter) external view returns (uint256) {
		return ICounter(_counter).count();
	}
}

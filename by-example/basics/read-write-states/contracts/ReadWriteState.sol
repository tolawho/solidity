//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ReadWriteState {
    uint256 public myNumber;

    constructor(uint256 _initialNumber) {
        myNumber = _initialNumber;
    }

    function get() public view returns (uint256) {
        return myNumber;
    }

    function set(uint256 _myNumber) public {
        myNumber = _myNumber;
    }
}

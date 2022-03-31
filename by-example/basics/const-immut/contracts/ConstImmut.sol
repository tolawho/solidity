//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ConstImmut {
    // const variables
    address public constant MY_ADDRESS =
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    uint256 public constant MY_UINT = 123456;

    // immutable variables
    address public immutable MY_IMMUTABLE_ADDRESS;
    uint256 public immutable MY_IMMUTABLE_UINT;

    constructor(uint256 _myImmutableUint) {
        MY_IMMUTABLE_ADDRESS = msg.sender;
        MY_IMMUTABLE_UINT = _myImmutableUint;
    }
}

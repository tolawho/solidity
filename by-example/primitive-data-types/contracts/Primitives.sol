//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Primitives {
    bool public boolValue = true;

    // unsigned integer
    // uint8 [0, 2**8 - 1]
    // uint16 [0, 2**16 - 1]
    // uint32 [0, 2**32 - 1]
    // ...
    // uint256 [0, 2**256 - 1]
    uint8 public u8 = 1;
    uint256 public u256 = 124;

    // integer
    // int256 [-2 ** 255 , 2 * 255 -1]
    // int128 [-2 ** 127 , 2 * 127 -1]
    int8 public i8 = -1;
    int256 public i256 = 289;

    // mininum and maximum of int
    int256 public minInt = type(int256).min;
    int256 public maxInt = type(int256).max;

    // address
    address public owner = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;

    // bytes
    bytes1 a = 0xb5; //  [10110101]
    bytes1 b = 0x56; //  [01010110]

    // default values
    bool public defaultBool; // false
    uint256 public defaultUint; // 0
    int256 public defaultInt; // 0
    address public defaultAddr; // 0
}

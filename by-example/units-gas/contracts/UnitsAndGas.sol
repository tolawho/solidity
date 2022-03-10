//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UnitsAndGas {
    uint256 public oneWei = 1 wei;
    // one wei equal to 1
    bool public isOneWei = 1 wei == 1;

    // one ether
    uint256 public oneEther = 1 ether;
    bool public isOneEther = 1 ether == 1e18;

    uint256 public counter;

    function outOfGas() public {
        // run a loop until all gas are spent
        // and txt will fails
        while (true) {
            counter += 1;
        }
    }
}

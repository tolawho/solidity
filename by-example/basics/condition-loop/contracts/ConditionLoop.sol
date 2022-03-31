//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ConditionLoop {
    function ifElse(uint256 input) public pure returns (string memory) {
        if (input < 10) {
            return "Less than 10";
        } else if (input < 20) {
            return "Less than 20";
        }

        return "Greater than or equal to 20";
    }

    function ternary(uint256 input) public pure returns (string memory) {
        return input < 10 ? "Less than 10" : "Greater than or equal to 10";
    }

    function forLoop(uint256 _x) public pure returns (uint256) {
        if (_x == 0) return 0;
        uint256 latest;
        for (uint256 index = 0; index <= _x; index++) {
            if (_x > 10 && index == 5) {
                latest = 5;
                break;
            }
            latest = index;
        }
        return latest;
    }

    function doWhile(uint256 _x) public pure returns (uint256) {
        uint256 latest;
        do {
            latest += 1;
        } while (latest < _x);
        return latest;
    }

    function whileDo(uint256 _x) public pure returns (uint256) {
        uint256 latest;
        while (latest < _x) {
            latest += 1;
        }
        return latest;
    }
}

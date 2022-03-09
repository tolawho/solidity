//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Variables {
    string private greeting;
    string public text = "Hello";
    uint256 public num = 123;

    struct LogState {
        uint256 local;
        uint256 timestamp;
        address sender;
    }

    function getVars()
        public
        view
        returns (
            uint256 _local,
            uint256 _timestamp,
            address _sender
        )
    {
        // Local variables
        uint256 i = 456;

        // Global variables
        uint256 timestamp = block.timestamp; // current block timestamp
        address sender = msg.sender; // address of caller

        return (i, timestamp, sender);
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

contract FuncPureViewError {
    uint256 public initial;
    address public owner;
    uint256 public x;
    bool public locked;

    event Log(address indexed _sender, string text);
    event AnotherLog();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = !locked;
        _;
        locked = !locked;
    }

    constructor() {
        initial = 10;
        x = 1000;
        owner = msg.sender;
    }

    // using view to promise not modify state variable
    function fnc1(uint256 _x, uint256 _y)
        public
        view
        returns (
            uint256,
            uint256,
            bool,
            string memory
        )
    {
        require(_x > initial, "X must greater than 10");

        if (_y > initial) {
            revert("Y must less than 10");
        }

        (uint256 total, bool xLessthan, string memory txt) = _calc1(_x, _y);

        assert(total > 15);

        return (initial, total, xLessthan, txt);
    }

    // using pure to promise not modify and read state variable
    function _calc1(uint256 _x, uint256 _y)
        private
        pure
        returns (
            uint256,
            bool,
            string memory
        )
    {
        uint256 total = _x + _y;
        bool xLessthan = _x < _y;
        return (total, xLessthan, xLessthan ? "X<Y" : "X>=Y");
    }

    function changeOwner(address _newOwner)
        public
        onlyOwner
        validAddress(_newOwner)
    {
        owner = _newOwner;
    }

    function decrement(uint256 d) public noReentrancy {
        x -= d;
        if (d > 1) {
            decrement(d - 1);
        }
    }

    function testEvent() public {
        emit Log(msg.sender, "Hello World!");
        emit Log(msg.sender, "Hello EVM!");
        emit AnotherLog();
    }
}

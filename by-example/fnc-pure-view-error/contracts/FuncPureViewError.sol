//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

contract FuncPureViewError {
    uint256 public initial;

    constructor() {
        initial = 10;
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
    function _calc1(uint256 x, uint256 y)
        private
        pure
        returns (
            uint256,
            bool,
            string memory
        )
    {
        uint256 total = x + y;
        bool xLessthan = x < y;
        return (total, xLessthan, xLessthan ? "X<Y" : "X>=Y");
    }
}

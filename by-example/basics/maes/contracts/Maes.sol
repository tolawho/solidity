//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./EnumDeclaration.sol";
import "./StructDeclaration.sol";

contract Maes {
    mapping(address => uint256) public myMap;
    mapping(address => mapping(uint256 => bool)) public nestedMap;

    // Array
    uint256[] public dynamicArr1;
    uint256[] public dynamicArr2 = [1, 2, 4];
    uint256[10] public fixedSizeArr;

    mapping(Status => string) public statusDetail;

    Status public status;

    Todo[] public todos;

    constructor() {
        statusDetail[Status.Pending] = "Pending";
        statusDetail[Status.Shipped] = "Shipped";
        statusDetail[Status.Accepted] = "Accepted";
        statusDetail[Status.Rejected] = "Rejected";
        statusDetail[Status.Canceled] = "Canceled";
    }

    function get(address _addr) public view returns (uint256) {
        return myMap[_addr];
    }

    function set(address _addr, uint256 _idx) public {
        myMap[_addr] = _idx;
    }

    function remove(address _addr) public {
        delete myMap[_addr];
    }

    function getNested(address _addr, uint256 _idx) public view returns (bool) {
        return nestedMap[_addr][_idx];
    }

    function setNested(
        address _addr,
        uint256 _idx,
        bool _boolValue
    ) public {
        nestedMap[_addr][_idx] = _boolValue;
    }

    function removeNested(address _addr, uint256 _idx) public {
        delete nestedMap[_addr][_idx];
    }

    function getArrayItem(uint256 _idx) public view returns (uint256) {
        require(_idx < dynamicArr1.length, "index out of bound");
        return dynamicArr1[_idx];
    }

    // push will increse array length
    function pushArrayItem(uint256 _val) public {
        dynamicArr1.push(_val);
    }

    // pop will remove last item and decrese array length
    function popArrayItem() public {
        dynamicArr1.pop();
    }

    function getLengthOfArray() public view returns (uint256) {
        return dynamicArr1.length;
    }

    function removeArrayItem(uint256 _idx) public {
        require(_idx < dynamicArr1.length, "index out of bound");
        delete dynamicArr1[_idx];
    }

    function removeArrayByShifting(uint256 _idx) public {
        require(_idx < dynamicArr1.length, "index out of bound");

        for (uint256 index = _idx; index < dynamicArr1.length - 1; index++) {
            dynamicArr1[index] = dynamicArr1[index + 1];
        }
        dynamicArr1.pop();
    }

    function getShippingStatus() public view returns (Status) {
        return status;
    }

    function getShippingStatusDetail() public view returns (string memory) {
        return statusDetail[status];
    }

    // Update status by passing uint into input
    function setShippingStatus(Status _status) public {
        status = _status;
    }

    // You can update to a specific enum like this
    function doCancel() public {
        status = Status.Canceled;
    }

    // delete resets the enum to its first value, 0
    function doReset() public {
        delete status;
    }

    // threeway initialize a struct
    function create1(string memory _txt) internal {
        todos.push(Todo(_txt, false));
    }

    // threeway initialize a struct
    function create2(string memory _txt) internal {
        todos.push(Todo({text: _txt, completed: false}));
    }

    // threeway initialize a struct
    function create3(string memory _txt) internal {
        Todo memory todo;
        todo.text = _txt;
        todos.push(todo);
    }

    function createTodo(string memory _txt, uint256 way) public {
        if (way == 1) create1(_txt);
        else if (way == 2) create2(_txt);
        else create3(_txt);
    }

    function getTodo(uint256 _idx) public view returns (string memory, bool) {
        Todo storage todo = todos[_idx];
        return (todo.text, todo.completed);
    }

    function getTodoLength() public view returns (uint256) {
        return todos.length;
    }

    function updateTodo(uint256 _idx, string memory _txt) public {
        Todo storage todo = todos[_idx];
        todo.text = _txt;
    }

    function toggleTodo(uint256 _idx) public {
        Todo storage todo = todos[_idx];
        todo.completed = !todo.completed;
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DataLocations {
    struct Todo {
        string text;
        bool completed;
    }

    mapping(address => Todo[]) public list;

    Todo[] public todos;

    function create(string memory _txt) public {
        _create(_txt);
    }

    function get() public view returns (Todo[] memory) {
        return list[msg.sender];
    }

    function update(uint256 _idx, string memory _txt) public {
        // Todo[] storage todo = list[msg.sender];
        // todo[_idx].text = _txt;
        list[msg.sender][_idx].text = _txt;
    }

    function remove(uint256 _idx) public {
        delete list[msg.sender][_idx];
    }

    function count() public view returns (uint256) {
        Todo[] storage todo = list[msg.sender];
        return _length(todo);
    }

    function toggleCompleted(uint256 _idx) public {
        list[msg.sender][_idx].completed = !list[msg.sender][_idx].completed;
    }

    function externalCall() external view returns (Todo[] memory) {
        Todo[] memory memoryTodo;
        Todo[] storage storageTodo = list[msg.sender];
        memoryTodo = storageTodo;
        return memoryTodo;
    }

    function _create(string memory _txt) private {
        address owner = msg.sender;
        Todo[] storage todo = list[owner];
        todo.push(Todo({text: _txt, completed: false}));
        list[owner] = todo;
    }

    function _length(Todo[] storage _todos) private view returns (uint256) {
        return _todos.length;
    }
}

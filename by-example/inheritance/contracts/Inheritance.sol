//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

contract X {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function getName() public view virtual returns (string memory) {
        return name;
    }
}

contract Y {
    string public text;

    constructor(string memory _txt) {
        text = _txt;
    }

    function getText() public view virtual returns (string memory) {
        return text;
    }
}

contract A is X("A Contract"), Y("Hello from A") {
    function getName() public view virtual override returns (string memory) {
        return "A Contract(override)";
    }

    function getText() public view virtual override returns (string memory) {
        return "Hello from A(override)";
    }
}

contract B is A {
    constructor(string memory _name, string memory _txt) A() {}

    function getName() public view virtual override returns (string memory) {
        return super.getName();
    }

    function getText() public view virtual override returns (string memory) {
        return super.getText();
    }
}

contract C is X, Y {
    constructor() X("C Contract") Y("Hello from C") {}
}

contract D is X, Y {
    constructor() Y("Hello from D") X("D Contract") {}
}

contract E is A {
    constructor() A() {
        name = "Contract E";
    }

    function getName() public view override returns (string memory) {
        return name;
    }

    function getText() public pure override returns (string memory) {
        return "Hello from E";
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
	constructor() ERC20("My First Token", "MFT") {
		_mint(msg.sender, 1000 * 10**18);
	}

	function decimals() public view virtual override returns (uint8) {
		return 18;
	}
}

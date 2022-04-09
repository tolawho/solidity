// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WorldOfPolygon is ERC1155, Ownable {
	using Counters for Counters.Counter;

	string public name;
	string public symbol;
	string public baseUri;
	Counters.Counter private _tokenIdCounter;

	constructor(
		string memory _name,
		string memory _symbol,
		string memory _baseUri
	) ERC1155(_baseUri) {
		name = _name;
		symbol = _symbol;
		baseUri = _baseUri;
	}

	function setURI(string memory newuri) public onlyOwner {
		_setURI(newuri);
	}

	function mint(uint amount) public onlyOwner {
		_tokenIdCounter.increment();
		uint tokenId = _tokenIdCounter.current();
		_mint(msg.sender, tokenId, amount, "");
	}

	function uri(uint tokenId)
		public
		view
		override
		onlyOwner
		returns (string memory)
	{
		return
			string(
				abi.encodePacked(baseUri, Strings.toString(tokenId), ".json")
			);
	}
}

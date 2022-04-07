// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";
import "./interfaces/ERC721Metadata.sol";

contract NftCollectible is ERC721, ERC721Metadata {
	string public name;
	string public symbol;
	uint public tokenCount;
	mapping(uint => string) private _tokenURIs;

	constructor(string memory _name, string memory _symbol) {
		name = _name;
		symbol = _symbol;
	}

	function tokenURI(uint _tokenId) external view returns (string memory) {
		require(_owners[_tokenId] != address(0), "token does not exist");
		return _tokenURIs[_tokenId];
	}

	function mint(string memory _tokenURI) public {
		tokenCount += 1; // _tokenId
		_balances[msg.sender] += 1;
		_owners[tokenCount] = msg.sender;
		_tokenURIs[tokenCount] = _tokenURI;

		emit Transfer(address(0), msg.sender, tokenCount);
	}
}

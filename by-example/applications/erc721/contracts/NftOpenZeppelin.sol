// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftOpenZeppelin is ERC721URIStorage {
	using Counters for Counters.Counter;

	Counters.Counter private _tokenIdCounter;

	constructor() ERC721("NFT OpenZeppelin", "NFTOZ") {}

	function mint(string memory _tokenURI) public returns (uint) {
		_tokenIdCounter.increment();
		uint tokenId = _tokenIdCounter.current();
		_mint(msg.sender, tokenId);
		_setTokenURI(tokenId, _tokenURI);
		return tokenId;
	}
}

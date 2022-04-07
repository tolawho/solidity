// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IERC721.sol";
import "./interfaces/IERC721Receiver.sol";
import "./libraries/Address.sol";

contract ERC721 is IERC721 {
	using Address for address;

	mapping(address => uint) internal _balances;
	mapping(uint => address) internal _owners;
	mapping(address => mapping(address => bool)) private _operatorApprovals;
	mapping(uint => address) private _tokenApprovals;

	modifier noZeroAddress(address _owner) {
		require(_owner != address(0), "invalid address");
		_;
	}

	function balanceOf(address _owner)
		external
		view
		noZeroAddress(_owner)
		returns (uint)
	{
		return _balances[_owner];
	}

	function ownerOf(uint _tokenId) public view override returns (address) {
		address _owner = _owners[_tokenId];
		require(_owner != address(0), "token does not exist");
		return _owner;
	}

	function safeTransferFrom(
		address _from,
		address _to,
		uint _tokenId,
		bytes memory data
	) public payable {
		transferFrom(_from, _to, _tokenId);
		require(
			_checkOnERC721Received(_from, _to, _tokenId, data),
			"ERC721Receiver not implemeted"
		);
	}

	function _checkOnERC721Received(
		address _from,
		address _to,
		uint _tokenId,
		bytes memory data
	) private returns (bool) {
		if (!_to.isContract()) return true;

		return
			IERC721Receiver(_to).onERC721Received(
				msg.sender,
				_from,
				_tokenId,
				data
			) == IERC721Receiver.onERC721Received.selector;
	}

	function safeTransferFrom(
		address _from,
		address _to,
		uint _tokenId
	) external payable {
		safeTransferFrom(_from, _to, _tokenId, "");
	}

	function transferFrom(
		address _from,
		address _to,
		uint _tokenId
	) public payable {
		address _owner = ownerOf(_tokenId);

		require(
			msg.sender == _owner ||
				getApproved(_tokenId) == msg.sender ||
				isApprovedForAll(_owner, msg.sender),
			"unauthorized"
		);
		require(_owner == _from, "from address is not the owner");
		require(_to != address(0), "invalid address");
		require(_owner != address(0), "token does not exist");

		approve(address(0), _tokenId);
		_balances[_from] -= 1;
		_balances[_to] += 1;
		_owners[_tokenId] = _to;
		emit Transfer(_from, _to, _tokenId);
	}

	function approve(address _approved, uint _tokenId) public payable {
		address _owner = ownerOf(_tokenId);
		require(
			msg.sender == _owner || isApprovedForAll(_owner, msg.sender),
			"unauthorized"
		);
		_tokenApprovals[_tokenId] = _approved;
		emit Approval(_owner, _approved, _tokenId);
	}

	function setApprovalForAll(address _operator, bool _approved) external {
		_operatorApprovals[msg.sender][_operator] = _approved;
		emit ApprovalForAll(msg.sender, _operator, _approved);
	}

	function getApproved(uint _tokenId) public view returns (address) {
		address _owner = _owners[_tokenId];
		require(_owner != address(0), "token does not exist");
		return _tokenApprovals[_tokenId];
	}

	function isApprovedForAll(address _owner, address _operator)
		public
		view
		returns (bool)
	{
		return _operatorApprovals[_owner][_operator];
	}

	function supportsInterface(bytes4 interfaceID)
		external
		pure
		returns (bool)
	{
		return
			interfaceID == type(IERC165).interfaceId ||
			interfaceID == type(IERC721).interfaceId;
	}
}

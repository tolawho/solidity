// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
How to swap tokens

1. Alice has 100 tokens from AliceCoin, which is a ERC20 token.
2. Bob has 100 tokens from BobCoin, which is also a ERC20 token.
3. Alice and Bob wants to trade 10 AliceCoin for 20 BobCoin.
4. Alice or Bob deploys TokenSwap
5. Alice approves TokenSwap to withdraw 10 tokens from AliceCoin
6. Bob approves TokenSwap to withdraw 20 tokens from BobCoin
7. Alice or Bob calls TokenSwap.swap()
8. Alice and Bob traded tokens successfully.
*/
contract TokenSwap {
	address public owner1;
	address public owner2;
	uint public amount1;
	uint public amount2;
	bool public locked;

	modifier noReEntrancy() {
		require(!locked, "No re-entrancy");
		locked = true;
		_;
		locked = false;
		owner1 = address(0);
		owner2 = address(0);
		amount1 = 0;
		amount2 = 0;
	}

	function swap(
		IERC20 _token1,
		uint _amount1,
		IERC20 _token2,
		address _owner2,
		uint _amount2
	) external noReEntrancy {
		IERC20 token1 = IERC20(_token1);
		IERC20 token2 = IERC20(_token2);
		owner1 = msg.sender;
		owner2 = _owner2;
		amount1 = _amount1;
		amount2 = _amount2;

		require(
			token1.allowance(owner1, address(this)) >= amount1,
			"Token 1 allowance too low"
		);
		require(
			token2.allowance(owner2, address(this)) >= amount2,
			"Token 2 allowance too low"
		);

		_safeTransferFrom(token1, owner1, owner2, amount1);
		_safeTransferFrom(token2, owner2, owner1, amount2);
	}

	function _safeTransferFrom(
		IERC20 token,
		address sender,
		address receiver,
		uint amount
	) private {
		bool sent = token.transferFrom(sender, receiver, amount);
		require(sent, "Token transfer failed");
	}
}

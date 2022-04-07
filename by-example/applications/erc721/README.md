# NFT - ERC721

## References

- [EIP-721](https://eips.ethereum.org/EIPS/eip-721)
  : IERC721, IERC165, IERC721Metadata, IERC721Receiver

- [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards)

## Results

[Smart Contract](https://mumbai.polygonscan.com/address/0xdf90c8dc881827240b7b524493341ea497c373d6)

[First NFT](https://testnets.opensea.io/assets/mumbai/0xdf90c8dc881827240b7b524493341ea497c373d6/1)

## Requirements

- NodeJS
- Yarn
- Hardhat

## Install dependency

`yarn` or `yarn install`

### Create .env file from env.example

```
$ cp .env.example .env
```

### Command

Try running some of the following tasks:

```shell
// Compile
$ yarn compile

// Test
$ yarn test

// Deploy
$ yarn deploy <network>

// Verify
$ yarn verify <network> <contract_address> <initial-args>

```

Example verify

```
$ yarn verify mumbai 0xdf90c8dc881827240b7b524493341ea497c373d6 "NFT Collectible" "NFTC"
```

```

// Accounts
$ yarn accounts

// Clean
$ yarn clean

// Generate Typechain
$ yarn tc

// Clean & Compile
$ yarn cc

```

```
npx hardhat node
npx hardhat help
REPORT*GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/\*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '\*\*/_.{json,sol,md}' --check
npx prettier '**/\*.{json,sol,md}' --write
npx solhint 'contracts/**/_.sol'
npx solhint 'contracts/\*\*/\_.sol' --fix

```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "NFT Collectible" "NFTC"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

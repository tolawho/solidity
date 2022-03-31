# Mapping, Array, Enum, Structs

- Mapping:

  - syntax `mapping(key=>value)`
  - `key` can be value types such as `uint`, `address` or `bytes`
  - `value` can be any type including another mapping or an array
  - not iterable

- Array
- Enum
- Structs

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

Edit private key and Bscscan API
Private is used for deployments on different network
Bscscan API key is used for deployment and verify contract

### Config network in config folder

Project is already configured for bsc testnet.
If required to deploy on another network, new configurations must be provided in the hardhat.config.ts

```shell
## Compile
`yarn compile`
## Test
`yarn test`
## Deploy
`yarn deploy <network>`
## Verify
```

```
$ yarn hardhat verify --network bsctest 0xCONTRACTADDRESS
```

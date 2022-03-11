# Data Location - Storage, Memory, Calldata

Variable declared as storage, memory, or calldata to explicitly specify the location of data

- `memory` is in memory and exist while func is being called
- `storage` variable is a state variable(store on blockchain)
- `calldata` special data location that contains fnc args, only available for external functions

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

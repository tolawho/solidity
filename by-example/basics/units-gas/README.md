# Ether, Wei, Gas and Gas Fee

## Desc

Transaction are paid with ether

- Ether,Wei

  - `1 ether` equal to `10^18 wei`
  - `1 wei` equal to `1`

- Gas,Gas Fee
  - `transaction(txt) fee` = `spent gas` \* `gas price`
  - `gas` is a unit of computation
  - `gas spent` is total `gas` used in a `txt`
  - `gas price` is how much `ether` you willing to pay per `gas`
  - `txt` with higher `gas` price have higher priority to be included in a block
  - `unspent gas` will be refunded

## Requirements

- NodeJS
- Yarn
- Hardhat

## Install dependency

`yarn install`

### Create .env file from env.example

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

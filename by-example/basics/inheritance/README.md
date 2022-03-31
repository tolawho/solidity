# Constructor - Inheritance - Shadowing inherited state

- Inheritance:

  - `virtual`keyword for function that is going to be overridden by a child contract
  - `override` keyword for function that is going to overridden a parent function

- Visibility
  - `public` any contract and account can call
  - `private` only contract defined the function
  - `internal` like `protected` in OOP, contract defined this function and inheritance can call
  - `external` another contract and account can call
  - state variables can be declared as `public`, `private`, `internal` but not `external`

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
## Compile
`yarn compile`
## Test
`yarn test`
## Deploy
`yarn deploy <network>`
```

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

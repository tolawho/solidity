import { ethers } from "hardhat";

async function main() {
  const WOP = await ethers.getContractFactory("WorldOfPolygon");
  const wop = await WOP.deploy(
    "WorldOfPolygon",
    "WOPO",
    "https://gateway.pinata.cloud/ipfs/QmXomabbQxf7cD25r1rdBxepPwi8Gx7k8DDafzrXS8RFiN/"
  );

  await wop.deployed();

  console.log("WorldOfPolygon deployed to:", wop.address);

  await wop.mint(20).then(async () => console.log(await wop.uri(1)));
  await wop.mint(18).then(async () => console.log(await wop.uri(2)));
  await wop.mint(15).then(async () => console.log(await wop.uri(3)));
  await wop.mint(15).then(async () => console.log(await wop.uri(4)));
  await wop.mint(10).then(async () => console.log(await wop.uri(5)));
  await wop.mint(10).then(async () => console.log(await wop.uri(6)));
  await wop.mint(5).then(async () => console.log(await wop.uri(7)));
  await wop.mint(5).then(async () => console.log(await wop.uri(8)));
  await wop.mint(1).then(async () => console.log(await wop.uri(9)));
  await wop.mint(1).then(async () => console.log(await wop.uri(10)));
  await wop.mint(1).then(async () => console.log(await wop.uri(11)));

  console.log("Nft successfully minted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

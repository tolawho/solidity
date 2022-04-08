import { ethers } from "hardhat";

async function main() {
  const NftCollectible = await ethers.getContractFactory("NftCollectible");
  const nftCollectible = await NftCollectible.deploy("NFT Collectible", "NFTC");

  await nftCollectible.deployed();

  console.log("NftCollectible deployed to:", nftCollectible.address);

  await nftCollectible.mint(
    "https://ipfs.io/ipfs/QmPrM1wLq1JAWjn1twKpFMyKopX9FA68562Re3jF4ZKUnd"
  );
  console.log("Nft successfully minted");

  const NftOZ = await ethers.getContractFactory("NftOpenZeppelin");
  const nftOZ = await NftOZ.deploy();

  await nftOZ.deployed();

  console.log("NftOpenZeppelin deployed to:", nftOZ.address);

  await nftOZ.mint(
    "https://ipfs.io/ipfs/QmUmiy1VrCa5L6TpcPgmSBdURxrFRXLM88D2bibB2oBQ2c"
  );
  console.log("NftOz successfully minted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

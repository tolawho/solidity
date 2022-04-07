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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

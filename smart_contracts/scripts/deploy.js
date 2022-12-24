const hre = require("hardhat");

async function main() {
  const DisplayProfileNFTsMinterFactory = await hre.ethers.getContractFactory("DisplayProfileNFTs");
  const displayProfileNFTs = await DisplayProfileNFTsMinterFactory.deploy();

  await displayProfileNFTs.deployed();

  console.log("DisplayProfileNFTs Contract: " + displayProfileNFTs.address);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/8jEf5MciWc655WKfLJdXmLfdi190DwT2", // Georli Network
      accounts: [
        `3817187a463e460923d4569bed57b978d34697fe0b7aa28b073079a7f94d613d`,  // Ganache Account - 01
      ],
    }
  },
};

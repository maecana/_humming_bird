require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337, // Chain ID for the Ganache
    },
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache Network
      accounts: [
        `6fef471928f26aa19093a135a9f93b659dcb42ff4eecd3324ec42ab549cbf1bd`,  // Ganache Account - 01
      ],
    }
  },
};

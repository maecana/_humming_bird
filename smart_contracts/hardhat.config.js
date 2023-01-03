require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' })

const ALCHEMY_KEY=process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const ALCHEMY_API=`https://eth-goerli.g.alchemy.com/v2/`;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `${ALCHEMY_API}${ALCHEMY_KEY}`, // Goerli Network
      accounts: [
        process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
      ],
    }
  },
};

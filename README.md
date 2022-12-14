#### _HUMMING_BIRD

> Author: Mae Anave Caña    
> Since: 2022-11-20    
> Updated: 2022-12-29    
> Version: 1.0    


##### Description: 
- A Twitter Clone app.
- This is a program that allows user to broadcast a message and other users are able to interact with the message.
- This program also allows user to mint NFTs as their display picture.


## Technologies

Listed below are the technologies used to make this app possible

| Name | Link | Description |
| ------ | ------ | ------ |
| NextJS | [https://nextjs.org/](https://tailwindcss.com/) | Front-end Use / Design |
| Tailwind CSS | [https://tailwindcss.com/](https://tailwindcss.com/)| Front-end Use / Design |
| ReactJS | [https://reactjs.org/](https://reactjs.org/) | Front-end Use / Design |
| Sanity | [https://www.sanity.io/](https://www.sanity.io/) | Back-end Use and Studio |
| Hardhat | [https://hardhat.org/](https://hardhat.org/) | Smart Contract Framework |
| Ganache | [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/) | Local Blockchain |
| Metamask | [https://metamask.io/](https://metamask.io/) | Crypto Wallet and Gateway |
| Alchemy | [https://www.alchemy.com/](https://www.alchemy.com/) | Web3 Development Platform |
| Pinata | [https://www.pinata.cloud/](https://www.pinata.cloud/) | Web3 Media Management |
| OpeanSea - TestNet | [https://testnets.opensea.io/](https://testnets.opensea.io/) | Marketplace for NFTs (TestNet) |


## Packages/Dependencies
- react-icons
- timeago.js
- hardhat
- alchemy-sdk
- @nomicfoundation/hardhat-toolbox
- @openzeppelin/contracts
- @sanity/client
- react-modal
- react-spinners
- @emotions/react
- axios
- ethers
- dotenv


## Install Yarn
Install yarn packages using the following command:
- Go to `client`folder: `cd client`
- Yarn Install: `yarn install`
- NPM Install: `npm install`
- Go to `stidio`folder: `cd studio`
- Install: `yarn install`


## Run the Client
Start the client server by going to `client` folder and running `development` / `production` environment
- `cd client/`
- `yarn run dev` or `yarn run prod`
- Go to `http://localhost:3000/`


## Run Sanity Studio
Start the studio by going to `studio` folder and starting sanity
- `cd studio/`
- `sanity start` 
- Go to `http://localhost:3333/`


## Smart Contracts
Compile and deploy all the existing smart contracts in the `/smart_contracts/contracts/` folder.
- Go to Folder: `cd smart_contracts/`
- Compile: `yarn hardhat compile`
- Deploy: `yarn hardhat run scripts/deploy.js --network goerli`


## License: 
This code is licensed under the MIT License.

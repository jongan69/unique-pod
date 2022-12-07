# Kudos - Give to get

[![CodeQL](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml)

-----

A full stack monorepo with

- React Native
- Nextjs
- Web3Auth
- Solidity
- Chainlink VRF
- Filecoin NFT.storage

built under The Chainlink 2022 Hackathon <https://devpost.com/software/kudos-bzion8>

Test Net Deploy:

## LATEST KUDOS TOKEN CONTRACT ADDRESS (GOERLI): 0x67714a689C38BfEbe0aD191a349aB3084Df415A8

## LATEST FAVORS CONTRACT ADDRESS (GOERLI): 0x693f7fe29CaE09F2110E9dA885769304e6f5cacE

[Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFD20.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)

-----

Mobile: <https://exp.host/@jongan69/kudos>

Web: <https://kudos-taupe.vercel.app/sign-in>

## Setup

1. Create Web3Auth.io Account at <https://dashboard.web3auth.io/>
2. Copy into credentials .env and constant.js
   Note: `WEB_API_ROUTES` would be the URL of the deployed nextjs app ie: vercel
3. yarn install inside the root and web directories

### For smart contract functionality

   1. Receive Test Link from <https://faucets.chain.link/>
   2. Create and Fund a VRF Subscription at <https://vrf.chain.link/>
   3. Deploy the `contracts/KudosToken.sol` via <https://remix.ethereum.org/> with a Total Token Supply
   4. Copy Token Contract Address
   5. Deploy the `contracts/FavorsV2.sol` via <https://remix.ethereum.org/> with subscription ID and Token Contract Address
   6. Add Favor Contract Address to .env file

## Usage

`yarn ios` - Run iOS App

`yarn android` - Run Android App

`yarn web` - Start Nextjs app

### Features

- Built using Web3auth
- Has nhost for Graph QL DB if needed
- Has Nextjs App for API
- File Reading Functions
- Has Smart Contract for Favor Posting, Retrieving, Completing, and payment

in a new `.env`
   backendUrl: "YOUR_NHOST_BACKEND_URL",

in `App.js`
  clientStorageType: "expo-secure-storage",

To Run Nextjs App:
  `yarn web` in root directory

### To do

- [x] Expo React Native App
- [x] Nextjs App
- [x] Web3Auth - React Native SDK
- [x] Thirdwebjs Auth - Nextjs SDK
- [x] ERC20 Contract
- [x] Chainlink VRF
- [x] FavorsV2 Contract
- [x] Mobile App Smart Contract Function Integration:
        1. Post Button => postFavor(text)
        2. Refresh Favors Button => getAllIncompleteFavors()
        3. Offers Tab => getMyFavors()
        4. Accept Button => acceptFavor
        5. Mark Completed Button => completeFavor(favorId)
- [ ] Fix Nextjs App (Connect to Deployed Contract)
- [ ] User Profile Contract / nHost
- [ ] Use React-Native-Async-Storage for Persistent Login State and Data
- [ ] Review +/- Test

Message Signing

`
const signMessage = async () => {
    try {
      setConsole("Signing message");
      const ethersProvider = ethers.getDefaultProvider(providerUrl);
      const wallet = new ethers.Wallet(key, ethersProvider);
      const originalMessage = "YOUR_MESSAGE";
      // Sign the message
      const signedMessage = await wallet.signMessage(originalMessage);
      console.log(signedMessage)
    } catch (e) {
      console.log(e)
    }
  };
`

Transaction Sending

`
const sendTransaction = async () => {
    try {
      setConsole("Sending transaction");
      const ethersProvider = ethers.getDefaultProvider(providerUrl);
      const wallet = new ethers.Wallet(key, ethersProvider);
      const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
      // Convert 1 ether to wei
      const amount = ethers.utils.parseEther("0.001");
      // Submit transaction to the blockchain
      const tx = await wallet.sendTransaction({
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });
      console.log(tx)
    } catch (e) {
      console.log(e)
    }
  };
`

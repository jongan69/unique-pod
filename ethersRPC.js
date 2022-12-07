import '@ethersproject/shims';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import { FAVOR_CONTRACT } from "@env"
import * as FavorABI from './artifacts/FavorsContractV2_metadata.json'
import { toast } from "@backpackapp-io/react-native-toast";

// To do for contract deploy
// 1. Compile + Deploy Token Contract
// 2. Make Chainlink VRF subscription
// 3. Compile + Deploy Favor Contract w/ Subscription ID and Contract Address
// 4. Use Favor Contract Address w/ Favor Contract ABI to Invoke Smart Contract Functions

global.Buffer = global.Buffer || Buffer;
const providerUrl = 'https://rpc.ankr.com/eth_goerli'; // Or your desired provider url

const postFavor = async (FavorText, key) => {
  try {
    const isComplete = false;
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const FavorContract = new ethers.Contract(FAVOR_CONTRACT, FavorABI.output.abi, signer);
    await FavorContract.estimateGas.addFavor(FavorText, isComplete)
      .then(async (hex) => {
        let gasLimit = parseInt(hex.toHexString(), 16)
        console.log('gas estimate to post a favor is', gasLimit);
        if (gasLimit > 0) {
          let postFavors = FavorContract.addFavor(FavorText, isComplete, { gasLimit });
          return postFavors;
        } else {
          let postFavors = FavorContract.addFavor(FavorText, isComplete, { gasLimit: 30000 });
          return postFavors;
        }
      });
  } catch (error) {
    console.log(error)
  }
}

const getMyFavors = async (key) => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const FavorContract = new ethers.Contract(FAVOR_CONTRACT, FavorABI.output.abi, signer);
    let myFavors = await FavorContract.getMyFavors();
    return myFavors;
  } catch (error) {
    console.log(error)
  }
}

const getAllIncompleteFavors = async (key) => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const FavorContract = new ethers.Contract(FAVOR_CONTRACT, FavorABI.output.abi, signer);
    let allFavors = await FavorContract.getAllIncompleteFavors();
    console.log('allFavors', allFavors)
    return allFavors;
  } catch (error) {
    console.log(error)
  }
}

const acceptFavor = async () => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const FavorContract = new ethers.Contract(FAVOR_CONTRACT, FavorABI.output.abi, signer);
    let accept = await FavorContract.acceptFavor();
    return accept;
  } catch (error) {
    console.log(error)
  }
}

const completeFavor = async () => {
  try {
    const provider = new ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key);
    const signer = wallet.connect(provider);
    const FavorContract = new ethers.Contract(FAVOR_CONTRACT, FavorABI.output.abi, signer);
    let complete = await FavorContract.completeFavor();
    return complete;
  } catch (error) {
    console.log(error)
  }
}

// Other Useful RPC Functions 

const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};

const getAccounts = async key => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = await wallet.address;
    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const balance = await wallet.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  } catch (error) {
    return error;
  }
};

const sendTransaction = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const destination = '0x8FB135b5892b9b26f3De16c454718fdA9dAa9EA0';
    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther('0.001');
    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
      maxFeePerGas: '6000000000000', // Max fee per gas
    });
    return tx;
  } catch (error) {
    return error;
  }
};

const signMessage = async key => {
  try {
    const ethersProvider = ethers.getDefaultProvider(providerUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const originalMessage = 'YOUR_MESSAGE';
    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);
    return signedMessage;
  } catch (error) {
    return error;
  }
};

export default {
  postFavor,
  getMyFavors,
  getAllIncompleteFavors,
  acceptFavor,
  completeFavor,
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
};
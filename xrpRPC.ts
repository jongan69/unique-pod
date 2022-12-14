import * as xrpl from 'xrpl';
import 'text-encoding';

const SERVER_URL = "wss://s.altnet.rippletest.net:51233";

export async function CreateWallet() {
    const client = new xrpl.Client(SERVER_URL);
    await client.connect();
    // Create a wallet and fund it with the Testnet faucet:
    const fund_result = await client.fundWallet()
    console.log(fund_result)
    return fund_result;
}

export async function Connect() {
    const client = new xrpl.Client(SERVER_URL);
    // Define the network client
    await client.connect()
    // ... custom code goes here
    // Disconnect when done (If you omit this, Node.js won't end the process)
    client.disconnect()
}

export async function getAllNfts(seed) {
    const client = new xrpl.Client(SERVER_URL);
    // Define the network client
    await client.connect();
    const operational_wallet = xrpl.Wallet.fromSeed(seed);

    const nfts = await client.request({
      method: "account_nfts",
      account: operational_wallet.classicAddress
    });

    let urls = []
    nfts.result.account_nfts.forEach((item) => {
      console.log(`nfts found: https://${xrpl.convertHexToString(item.URI).slice(7)}.ipfs.nftstorage.link`)
      urls.push(`https://${xrpl.convertHexToString(item.URI).slice(7)}.ipfs.nftstorage.link`)
    })



    // Disconnect when done (If you omit this, Node.js won't end the process)
    client.disconnect()
    return { nfts, urls }
}

export async function mintToken(seed, podcast, ipfsurl) {  
  console.log('MINT DATA: ' + seed + podcast + ipfsurl)

  const client = new xrpl.Client(SERVER_URL);
  await client.connect();
  
  const operational_wallet = xrpl.Wallet.fromSeed(seed);

  // Note that you must convert the token URL to a hexadecimal 
  // value for this transaction.
  // ------------------------------------------------------------------------
  const transactionBlob = {
    "TransactionType": "NFTokenMint",
    "Account": operational_wallet.classicAddress,
    "URI": xrpl.convertStringToHex(ipfsurl),
    "Flags": 8,
    "TransferFee": 1000,
    "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
  }

  const tx = await client.submitAndWait(transactionBlob, { wallet: operational_wallet} )
  const nfts = await client.request({
    method: "account_nfts",
    account: operational_wallet.classicAddress
  })  

  console.log(`tx data: ${tx}`)
  console.log(`nft data: ${nfts}`)

  return { tx, nfts }
}


export async function oPmintToken() {
    results = 'Connecting to ' + getNet() + '....'
    document.getElementById('operationalResultField').value = results
    let net = getNet()
    const operational_wallet = xrpl.Wallet.fromSeed(operationalSeedField.value)
    const client = new xrpl.Client(net)
    await client.connect()
    results += '\nConnected. Minting NFToken.'
    document.getElementById('operationalResultField').value = results
    // Note that you must convert the token URL to a hexadecimal 
    // value for this transaction.
    // ------------------------------------------------------------------------
    const transactionBlob = {
      "TransactionType": 'NFTokenMint',
      "Account": operational_wallet.classicAddress,
      "URI": xrpl.convertStringToHex(operationalTokenUrlField.value),
      "Flags": parseInt(operationalFlagsField.value),
      "TransferFee": parseInt(operationalTransferFeeField.value),
      "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
    }
    // ----------------------------------------------------- Submit signed blob 
    const tx = await client.submitAndWait(transactionBlob, { wallet: operational_wallet} )
    const nfts = await client.request({
      method: "account_nfts",
      account: operational_wallet.classicAddress
    })  
    // ------------------------------------------------------- Report results
    results += '\n\nTransaction result: '+ tx.result.meta.TransactionResult
    results += '\n\nnfts: ' + JSON.stringify(nfts, null, 2)
    document.getElementById('operationalBalanceField').value = 
      (await client.getXrpBalance(operational_wallet.address))
    document.getElementById('operationalResultField').value = results    
  
    client.disconnect()
  } //End of oPmintToken


export async function AccountDetails(address) {
    const client = new xrpl.Client(SERVER_URL);
    // Define the network client
    await client.connect()
    // Get info from the ledger about the address we just funded
    const response = await client.request({
        "command": "account_info",
        "account": address,
        "ledger_index": "validated"
    })
    console.log(response)
    // Listen to ledger close events
    client.request({
        "command": "subscribe",
        "streams": ["ledger"]
    })
    client.on("ledgerClosed", async (ledger) => {
        console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    })
    // Disconnect when done so Node.js can end the process
    client.disconnect()
}
import * as xrpl from 'xrpl';
import 'text-encoding';

const SERVER_URL = "wss://s.altnet.rippletest.net:51233";

export async function CreateWallet() {
    const client = new xrpl.Client(SERVER_URL);
    await client.connect();
    // Create a wallet and fund it with the Testnet faucet:
    const fund_result = await client.fundWallet()
    const test_wallet = fund_result.wallet
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
//variables, consts & modeules:
const bitcore = require('bitcore-lib');
const axios = require('axios');
const Script = bitcore.Script;

//satoshis that are going to be sent:
const satoshis = 52000;

//Testnet Keys. Sender address & privatekey:
const address = "sender_tesnet_address_here";
const privatekey = "sender_privatekey_here";
//Recipient address:
const recipientAddress = "recipient_address_here";

//Function to get current network fees (Testnet):
async function fees() {
  try {
    let r = await axios.get('https://api.blockcypher.com/v1/btc/test3');
    let feeObj = new Object;
    feeObj["High_fee"] = r.data.high_fee_per_kb;
    feeObj["Medium_fee"] = r.data.medium_fee_per_kb;
    feeObj["Low_fee"] = r.data.low_fee_per_kb;
    return feeObj;
  } catch (error) {
    console.error(error);
  }
}

//UTXOs url:
async function getUTXOs() {

  try {

    //Get Max. priority fee:
    let res = await fees();
    let fee = res.High_fee;

    //Get all Unspent Tx Outputs:
    let url = `https://api.bitcore.io/api/BTC/testnet/address/${address}/?unspent=true`;
    res = await axios.get(url);
    //console.log(res.data);

    //Now with this loop we only select the necessary utxos:
    let i = 0;
    let utxo = {};
    let utxos = [];
    let balance_utxos = 0;

    while (balance_utxos <= satoshis + fee) {
      utxo = {
        "address": address,
        "txId": res.data[i].mintTxid,
        "outputIndex": res.data[i].mintIndex,
        "script": Script.buildPublicKeyHashOut(address).toString(),
        "satoshis": res.data[i].value
      };
      utxos.push(utxo);
      balance_utxos = balance_utxos + res.data[i].value;
      i++;
    }

    console.log("utxos: ", utxos);

    //create & sign the txn:
    let tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(recipientAddress, satoshis);
    tx.change(address);
    tx.fee(fee);
    tx.sign(privatekey);
    tx.serialize();
    console.log("Transaction: ", tx);
 
    let txnHex = tx.toString();
    console.log("Raw txnHex: ", txnHex);

    //Submit the txn to the blockchain (bitcoin testnet):
    let payload = {
      "data": {
        "item": {
          "signedTransactionHex": "0x"+txnHex
        }
      }
    };
    //We submit the txn through a cryptoapis.io`s node:
    axios.defaults.headers['X-API-KEY'] = 'your_api_key_here';
    res = await axios.post(
      'https://rest.cryptoapis.io/v2/blockchain-tools/bitcoin/testnet/transactions/broadcast',
      payload
    );
    console.log(res.data);
    

  } catch (error) {
    console.error(error.response.data);
  }

}

getUTXOs();



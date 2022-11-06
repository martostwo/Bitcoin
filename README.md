# Bitcoin
Bitcoin transaction with NodeJS.

This NodeJS project will allow you to create, sign and upload transactions to the [Bitcoin](https://bitcoin.org) blockchain.

This code by default creates the transaction on the Testnet but you can switch to the Mainnet by modifying bitcoin.js

The bitcore library is used to create the structure of the transactions and sign them.

You can create an address and a private key using generateAddress.js

To obtain an estimate of the appropriate fees to submit the transaction, the [Blockcypher](https://www.blockcypher.com/) api is used.

To upload the transaction, a [Crypto APIs](https://cryptoapis.io/![bitcoin-payment-schema](https://user-images.githubusercontent.com/92114788/200150709-98ad139d-9f2a-467c-89a8-a8479fa218fd.png)
) node is used.

do `npm i axios bitcore-lib`

Conceptual scheme of a bitcoin transaction:

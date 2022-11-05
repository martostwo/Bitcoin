var bitcore = require('bitcore-lib');
var rand_buffer = bitcore.crypto.Random.getRandomBuffer(32);
var rand_number = bitcore.crypto.BN.fromBuffer(rand_buffer);

var privateKey = new bitcore.PrivateKey(rand_number);
var address = privateKey.toAddress('testnet');
console.log({
    "privatekey": privateKey.toString(),
    "address": address.toString()
});
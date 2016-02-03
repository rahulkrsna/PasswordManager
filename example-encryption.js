var crypto = require("crypto-js");
var secretKey = "123abc";

/*
// Stage - 1 
var secretMessage = "I hid the chips under the couch.";

//Encrypt the message
var encryptedMessage = crypto.AES.encrypt(secretMessage, secretKey);
console.log("Encrypted Message: " + encryptedMessage);

// Decrypt the message
var bytes = crypto.AES.decrypt(encryptedMessage,secretKey);
var decryptedMessage = bytes.toString(crypto.enc.Utf8);
console.log("Decrypted Message: " + decryptedMessage);

*/




// Stage - 2
/*
	Challenge,
	secretMessage, as object,
	encrypt the secretmessage, and decrypt.
*/

var secretMessage2 = {
	name: "Rahul",
	secretName: "Sherlock"
};

var message = JSON.stringify(secretMessage2);
var encryptMsg = crypto.AES.encrypt(message, secretKey);
console.log("Encrypted Message: " + encryptMsg);

var bytes2 = crypto.AES.decrypt(encryptMsg, secretKey);
var decryptMsg = bytes2.toString(crypto.enc.Utf8);
console.log(decryptMsg);
console.log(typeof decryptMsg);

var secretMsg = JSON.parse(decryptMsg);
console.log(secretMsg);
console.log(typeof secretMsg);

console.log('---------\t END \t-------------');
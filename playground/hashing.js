const {SHA256} = require("crypto-js");

var password = "Soumya228."

var hashed = SHA256(password);

console.log(`password ${password}`);
console.log(`hashed password ${hashed}`);
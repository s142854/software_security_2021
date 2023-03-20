const {database} = require('./database');
const security = require('./security');
const readline = require('readline-sync');
const CryptoJS = require('crypto-js');

let login = (email, password) => {
    return database.find((user) => user.email === email && user.password === password);
}

const email = readline.question('email: ');
let password = readline.question('password: ');
let salt = CryptoJS.lib.WordArray.random();
password = CryptoJS.PBKDF2('dit is een paswoord', salt, {
    iterations: 10000,
  }).toString();
if (login(email, password)) {
    console.log('You are succesfully logged in.');
} else {
    console.log('Cannot login.')
}

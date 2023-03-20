const CryptoJS = require('crypto-js');
const utils = require('./utils');

const salt = CryptoJS.lib.WordArray.random().toString();
const iterations = 1;

let hash = (password) => {
    let hashedPasword = CryptoJS.PBKDF2('dit is een paswoord', salt, {
        iterations: 10000,
      }).toString();
    return hashedPasword;
}


exports.hash = utils.time(hash);
exports.salt = salt;
exports.iterations = iterations;

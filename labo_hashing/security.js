const CryptoJS = require('crypto-js');
const utils = require('./utils');

const salt = CryptoJS.lib.WordArray.random().toString();
const iterations = 1;

const hash = (password) => {
    let hashedPasword = password; // TODO: Hash this pasword.
    return hashedPasword;
}

exports.hash = utils.time(hash);
exports.salt = salt;
exports.iterations = iterations;
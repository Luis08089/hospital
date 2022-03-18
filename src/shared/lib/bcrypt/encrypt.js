const bcrypt = require('bcrypt');
const conf = require('../../../config');

async function hashPassword(plainTextPassword) { 
    const hash = await bcrypt.hash(plainTextPassword, conf.BCRYPT.SALT_ROUNDS);
    return hash.toString();
}

async function compare(plainTextPassword, passwordHash) {
    const match = await bcrypt.compare(plainTextPassword, passwordHash);
    return match;
}

module.exports = { 
    hashPassword, compare
}
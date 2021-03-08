const security = require('./security');

const database = require('./users.json').map((user) => ({
    email: user.email,
    password: security.hash(user.password)
}));

exports.database = database;
const { database } = require('./database');

console.log(`${'username'.padEnd(25,' ')} | ${'password'.padEnd(35,' ')}`)
console.log(`${''.padEnd(25,'-')} | ${''.padEnd(35,'-')}`)

database.forEach((user) => {
    console.log(`${user.email.padEnd(25,' ')} | ${user.password.padEnd(35,' ')}`)
});
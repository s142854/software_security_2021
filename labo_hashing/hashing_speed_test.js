const security = require('./security');

let iterations = 10;
let start = (new Date()).getTime();

for (let i = 0; i < iterations;i ++) {
    security.hash(i.toString());
}

let end = (new Date()).getTime();

console.log(`[DEBUG] Average hashing time: ${Math.round((end-start)/iterations)} ms`)
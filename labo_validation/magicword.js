const chalk = require('chalk');

(async() => {
    do {
        console.log(chalk.rgb(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255))('AH AH AH! YOU DIDN\'T SAY THE MAGIC WORD!'));
        await await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            },500);
        })
    } while (true);
})();
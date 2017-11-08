'use strict'

let doLimit = require('./rate_limit');

async function main() {
    try {
        await doLimit('test', 100);
    } catch (error) {
        console.log(error);
    }
}


main();
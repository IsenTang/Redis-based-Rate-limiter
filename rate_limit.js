'use strict'

let redis = require('./redisConnection');
let _ = require('lodash');
let randomize = require('randomatic');

const doLimit = async(key, permitsPerUnit) => {
    if (!_.isEmpty(key) && !_.isEmpty(permitsPerUnit + '')) {
        let keyName = await getKeyname(key);
        let expires = "10";
        return await redis.secLock(keyName, expires, permitsPerUnit);
    } else {
        throw new Error('key or permitsPerUnit is undefinded');
    }
}


async function getKeyname(key) {
    return key + await redis.time().get(0)
}



module.exports = doLimit;
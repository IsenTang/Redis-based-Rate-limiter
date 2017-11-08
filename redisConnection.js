'use strict'

let ioredis = require('ioredis');
let config = require('config');


let redis = new ioredis(config.redisConfig);

redis.defineCommand('secLock', {
    numberOfKeys: 1,
    lua: "local current;" +
        " current = redis.call('incr',KEYS[1]); " //将key中存储的数字增加1
        +
        " if tonumber(current) == 1 then " +
        " 	redis.call('expire',KEYS[1],ARGV[1]); " +
        "     return 1; " +
        " else" +
        " 	if tonumber(current) <= tonumber(ARGV[2]) then " //argv[1]:getExpire() 过期时间   argv[2]:permitsPerUnit
        +
        "     	return 1; " +
        "		else " +
        "			return -1; " +
        "     end " +
        " end "
});


redis.on('connect', function() {
    console.log('redis connected!');
});

redis.on('ready', function() {
    console.log('redis ready!');
});

redis.on('error', function(e) {
    console.log('redis error!');
    console.log(e);
});

redis.on('close', function() {
    console.log('redis close!');
});

module.exports = redis;
const Redis = require('ioredis')

const redis = new Redis('redis://:@127.0.0.1:6379/0')

module.exports = redis

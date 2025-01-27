const Redis = require('ioredis')
const { RunConfig } = require('../config/config')
const redis = new Redis(RunConfig.redis.url)

module.exports = redis

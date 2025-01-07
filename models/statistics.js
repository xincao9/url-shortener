const { INTEGER } = require('sequelize')
const redis = require('../plugins/redis')

const keys = [
  'statistics:visits',
  'statistics:usage',
  'statistics:success',
  'statistics:failures',
]

const [visits, usage, success, failures] = keys

const get = async () => {
  let resp = { visits: '0', usage: '0', success: '0', failures: '0' }
  try {
    const values = await redis.mget(keys)
    if (values.length !== keys.length) {
      return resp
    }
    if (values[0] !== null) {
      resp.visits = values[0]
    }
    if (values[1] !== null) {
      resp.usage = values[1]
    }
    if (values[2] !== null) {
      resp.success = values[2]
    }
    if (values[3] !== null) {
      resp.failures = values[3]
    }
  } catch (error) {
    console.log(error)
  }
  return resp
}

const increment = async (key) => {
  try {
    return await redis.incr(key)
  } catch (error) {
    console.log(error)
  }
  return 0
}

module.exports = { get, increment, keys: { visits, usage, success, failures } }

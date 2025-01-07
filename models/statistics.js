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
    ;[resp.visits, resp.usage, resp.success, resp.failures] = values
  } catch (error) {
    console.log(error)
  }
  return resp
}

module.exports = { get }

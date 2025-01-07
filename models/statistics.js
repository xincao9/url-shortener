const redis = require('../plugins/redis')

const keys = [
  'statistics:visits',
  'statistics:usage',
  'statistics:success',
  'statistics:failures',
]

const [visits, usage, success, failures] = keys

const get = async () => {
  let resp = {}
  try {
    const values = await redis.mget(keys)
    if (values.length !== keys.length) {
      return resp
    }
    ;[resp.visits, resp.usage, resp.success, resp.failures] = values.map(
      (value) => {
        if (value === null) {
          return 0
        }
        return parseInt(value, 10)
      }
    )
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

require('dotenv').config()

const config = {
  development: {
    mysql: {
      username: 'root',
      password: '',
      database: 'url_shortener',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    domain: 'http://localhost:3000',
    redis: {
      url: 'redis://:@127.0.0.1:6379/0',
    },
    jwtSecret: process.env.JWT_SECRET || 'development',
  },
}

const RunConfig = config[process.env.NODE_ENV || 'development']

module.exports = { RunConfig }

require('dotenv').config()

const { Sequelize } = require('sequelize')
const config = {
  development: {
    mysql: {
      username: 'root',
      password: 'asdf',
      database: 'url_shortener',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    domain: 'http://localhost:3000',
  },
}

const runConfig = config[process.env.NODE_ENV || 'development']

console.log(`runConfig: ${runConfig}`)

const sequelize = new Sequelize(runConfig.mysql)

sequelize
  .authenticate()
  .then((value) => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

module.exports = { sequelize, runConfig }

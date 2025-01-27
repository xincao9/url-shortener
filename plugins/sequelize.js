const { RunConfig } = require('../config/config')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(RunConfig.mysql)

sequelize
  .authenticate()
  .then((value) => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

module.exports = sequelize

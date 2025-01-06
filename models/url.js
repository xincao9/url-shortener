const { sequelize } = require('../config/config')
const { Model, DataTypes } = require('sequelize')

class Url extends Model {}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    raw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'url' }
)

module.exports = Url

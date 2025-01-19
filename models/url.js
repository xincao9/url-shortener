const sequelize = require('../plugins/sequelize')
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
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'url',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = Url

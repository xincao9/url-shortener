const sequelize = require('../plugins/sequelize')
const { Model, DataTypes } = require('sequelize')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = User

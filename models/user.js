const { sequelize } = require('../config/config');
const { Model, DataTypes } = require('sequelize');

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, { sequelize, modelName: 'user' });

module.exports = User;
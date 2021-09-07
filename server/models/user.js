'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Nama depan tidak boleh null' },
        notEmpty: { args: true, msg: 'Nama depan tidak boleh kosong' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Nama belakang tidak boleh null' },
        notEmpty: { args: true, msg: 'Nama belakang tidak boleh kosong' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Password tidak boleh  null' },
        notEmpty: { args: true, msg: 'Password tidak boleh empty' },
        len: { args: [8], msg: 'Password minimal 8 karakter' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
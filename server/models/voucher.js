'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Voucher.init({
    code: DataTypes.STRING,
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Harga tidak boleh  null' },
        notEmpty: { args: true, msg: 'Harga tidak boleh empty' },
        isInt: { args: true, msg: 'Harga harus bilangan bulat positif' },
        min: 0,
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};
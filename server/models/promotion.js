'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Promotion.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Kode Promosi tidak boleh  null' },
        notEmpty: { args: true, msg: 'Kode Promosi boleh empty' }
      }
    },
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    status: DataTypes.STRING,
    maxRedeem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Max Redeem tidak boleh  null' },
        notEmpty: { args: true, msg: 'Max Redeem  tidak boleh empty' },
        isInt: { args: true, msg: 'Max Redeem  harus bilangan bulat positif' },
        min: 0,
      }
    },
    currentCount: DataTypes.INTEGER,
    expiredDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'expiredDate tidak boleh  null' },
        notEmpty: { args: true, msg: 'expiredDate  tidak boleh empty' },
        isDate: true,             // only allow date strings
        isAfter: "2000-01-01",    // only allow date strings after a specific date
        isBefore: "2050-01-01",   // only allow date strings before a specific date
      }
    },
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};
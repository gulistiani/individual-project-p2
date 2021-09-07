'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrxHead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TrxHead.init({
    userId: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    subTotal: DataTypes.INTEGER,
    promoId: DataTypes.INTEGER,
    promoCode: DataTypes.STRING,
    promoAmount: DataTypes.INTEGER,
    promoAmountUsed: DataTypes.INTEGER,
    voucherId: DataTypes.INTEGER,
    voucherCode: DataTypes.STRING,
    voucherAmount: DataTypes.INTEGER,
    voucherAmountUsed: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TrxHead',
  });
  return TrxHead;
};
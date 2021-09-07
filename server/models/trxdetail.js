'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrxDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TrxDetail.init({
    trxHeadId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    finalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TrxDetail',
  });
  return TrxDetail;
};
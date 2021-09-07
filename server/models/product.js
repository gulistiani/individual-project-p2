'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Nama produk tidak boleh  null' },
        notEmpty: { args: true, msg: 'Nama produk tidak boleh empty' }
      }
    },
    description: DataTypes.STRING,
    alias: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Harga produk tidak boleh  null' },
        notEmpty: { args: true, msg: 'Harga produk tidak boleh empty' },
        isInt: { args: true, msg: 'Harga produk harus bilangan bulat positif (dalam rupiah)' },
        min: 0
      }
    },
    discountedPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { args: true, msg: 'Harga diskon harus bilangan bulat positif (dalam rupiah)' }
      }
    },
    imageURL: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
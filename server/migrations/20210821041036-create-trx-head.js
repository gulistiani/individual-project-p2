'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrxHeads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: { type: Sequelize.INTEGER },
      customerName: { type: Sequelize.STRING },
      subTotal: { type: Sequelize.INTEGER },
      promoId: { type: Sequelize.INTEGER },
      promoCode: { type: Sequelize.STRING },
      promoAmount: { type: Sequelize.INTEGER },
      promoAmountUsed: { type: Sequelize.INTEGER },
      voucherId: { type: Sequelize.INTEGER },
      voucherCode: { type: Sequelize.STRING },
      voucherAmount: { type: Sequelize.INTEGER },
      voucherAmountUsed: { type: Sequelize.INTEGER },
      total: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrxHeads');
  }
};
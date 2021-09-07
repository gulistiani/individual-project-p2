'use strict';
const fs = require('fs')

let productDetails = JSON.parse(fs.readFileSync('./seeder-data/product-details.json', { encoding: 'utf-8' }))
productDetails = productDetails.map(productDetail => {
  return {
    ...productDetail,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ProductDetails', productDetails, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"ProductDetails_id_seq"' , (SELECT MAX(id) FROM "ProductDetails"))`)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductDetails')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

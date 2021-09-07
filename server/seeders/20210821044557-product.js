'use strict';
const fs = require('fs')

let products = JSON.parse(fs.readFileSync('./seeder-data/products.json', { encoding: 'utf-8' }))
products = products.map(product => {
  return {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', products, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Products_id_seq"' , (SELECT MAX(id) FROM "Products"))`)
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
    await queryInterface.bulkDelete('Products')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

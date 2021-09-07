'use strict';
const fs = require('fs')

let promotions = JSON.parse(fs.readFileSync('./seeder-data/promotions.json', { encoding: 'utf-8' }))
promotions = promotions.map(promotion => {
  return {
    ...promotion,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Promotions', promotions, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Promotions_id_seq"' , (SELECT MAX(id) FROM "Promotions"))`)
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
    await queryInterface.bulkDelete('Promotions')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';
const fs = require('fs')

let vouchers = JSON.parse(fs.readFileSync('./seeder-data/vouchers.json', { encoding: 'utf-8' }))
vouchers = vouchers.map(voucher => {
  return {
    ...voucher,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vouchers', vouchers, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Vouchers_id_seq"' , (SELECT MAX(id) FROM "Vouchers"))`)
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
    await queryInterface.bulkDelete('Vouchers')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

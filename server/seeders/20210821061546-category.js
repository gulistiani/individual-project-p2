'use strict';
const fs = require('fs')

let categories = JSON.parse(fs.readFileSync('./seeder-data/categories.json', { encoding: 'utf-8' }))
categories = categories.map(category => {
  return {
    ...category,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Categories_id_seq"' , (SELECT MAX(id) FROM "Categories"))`)
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
    await queryInterface.bulkDelete('Categories')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

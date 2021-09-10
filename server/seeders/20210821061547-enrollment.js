'use strict';
const fs = require('fs')

let enrollments = JSON.parse(fs.readFileSync('./seeder-data/enrollments.json', { encoding: 'utf-8' }))
enrollments = enrollments.map(enrollment => {
  return {
    ...enrollment,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Enrollments', enrollments, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Enrollments_id_seq"' , (SELECT MAX(id) FROM "Enrollments"))`)
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
    await queryInterface.bulkDelete('Enrollments')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';
const iconSpendingsData = require('../masterdata/iconSpending.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataIconSpendingsToBeSeeded = iconSpendingsData.map((eachIconSpendingData) => {
      return {
        url_icSpending: eachIconSpendingData.url_icSpending,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('IconSpendings', dataIconSpendingsToBeSeeded, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IconSpendings', null, { truncate: true, restartIdentity: true });
  }
};

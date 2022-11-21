'use strict';
const spendingsData = require('../masterdata/spending.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataSpendingsToBeSeeded = spendingsData.map((eachSpendingData) => {
      return {
        user_id: eachSpendingData.user_id,
        kategoriSpending_id: eachSpendingData.kategoriSpending_id,
        dompet_id: eachSpendingData.dompet_id,
        spending: eachSpendingData.spending,
        name_spending: eachSpendingData.name_spending,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Spendings', dataSpendingsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spendings', null, { truncate: true, restartIdentity: true });
  }
};

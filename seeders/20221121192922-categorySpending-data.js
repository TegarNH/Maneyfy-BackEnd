'use strict';
const categorySpendingsData = require('../masterdata/categorySpending.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataSpendingsToBeSeeded = categorySpendingsData.map((eachSpendingData) => {
      return {
        user_id: eachSpendingData.user_id,
        icSpending_id: eachSpendingData.icSpending_id,
        categoryName_spending: eachSpendingData.categoryName_spending,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('CategorySpendings', dataSpendingsToBeSeeded, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategorySpendings', null, { truncate: true, restartIdentity: true });
  }
};
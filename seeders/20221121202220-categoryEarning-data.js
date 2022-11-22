'use strict';
const categoryEarningsData = require('../masterdata/categoryEarning.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataEarningsToBeSeeded = categoryEarningsData.map((eachEarningData) => {
      return {
        user_id: eachEarningData.user_id,
        icEarning_id: eachEarningData.icEarning_id,
        categoryName_earning: eachEarningData.categoryName_earning,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('CategoryEarnings', dataEarningsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoryEarnings', null, { truncate: true, restartIdentity: true });
  }
};

'use strict';
const earningsData = require('../masterdata/earning.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataEarningsToBeSeeded = earningsData.map((eachEarningData) => {
      return {
        user_id: eachEarningData.user_id,
        kategoriEarning_id: eachEarningData.kategoriEarning_id,
        dompet_id: eachEarningData.dompet_id,
        earning: eachEarningData.Earning,
        name_earning: eachEarningData.name_earning,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Earnings', dataEarningsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Earnings', null, { truncate: true, restartIdentity: true });
  }
};

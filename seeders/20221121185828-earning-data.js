'use strict';
const earningsData = require('../masterdata/earning.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataEarningsToBeSeeded = earningsData.map((eachEarningData) => {
      return {
        user_id: eachEarningData.user_id,
        type_transaction: eachEarningData.type_transaction,
        categoryEarning_id: eachEarningData.categoryEarning_id,
        dompet_id: eachEarningData.dompet_id,
        earning: eachEarningData.earning,
        name_earning: eachEarningData.name_earning,
        date_earning: eachEarningData.date_earning,
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

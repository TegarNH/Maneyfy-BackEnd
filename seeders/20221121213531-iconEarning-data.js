'use strict';
const iconEarningsData = require('../masterdata/iconEarning.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataIconEarningsToBeSeeded = iconEarningsData.map((eachIconEarningData) => {
      return {
        url_icEarning: eachIconEarningData.url_icEarning,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('IconEarnings', dataIconEarningsToBeSeeded, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IconEarnings', null, { truncate: true, restartIdentity: true });
  }
};

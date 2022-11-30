'use strict';
const dompetsData = require('../masterdata/dompet.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataDompetsToBeSeeded = dompetsData.map((eachDompetData) => {
      return {
        user_id: eachDompetData.user_id,
        icDompet_id: eachDompetData.icDompet_id,
        name_dompet: eachDompetData.name_dompet,
        amount: eachDompetData.amount,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Dompets', dataDompetsToBeSeeded, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dompets', null, { truncate: true, restartIdentity: true });
  }
};

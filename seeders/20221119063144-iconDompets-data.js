'use strict';
const IconDompetsData = require('../masterdata/iconDompet.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataIconDompetsToBeSeeded = IconDompetsData.map((eachIconDompetData) => {
      return {
        url_icDompet : eachIconDompetData.url_icDompet,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('IconDompets', dataIconDompetsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IconDompets', null, { truncate: true, restartIdentity: true });
  }
};

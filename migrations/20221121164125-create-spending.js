'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spendings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      dompet_id: {
        type: Sequelize.INTEGER
      },
      categorySpending_id: {
        type: Sequelize.INTEGER
      },
      spending: {
        type: Sequelize.INTEGER
      },
      name_spending: {
        type: Sequelize.STRING
      },
      date_spending: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spendings');
  }
};
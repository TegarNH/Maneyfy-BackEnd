'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      type_transaction: {
        type: Sequelize.STRING
      },
      categoryTransaction_id: {
        type: Sequelize.INTEGER
      },
      dompet_id: {
        type: Sequelize.INTEGER
      },
      amount_transaction: {
        type: Sequelize.INTEGER
      },
      name_transaction: {
        type: Sequelize.STRING
      },
      date_transaction: {
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
    await queryInterface.dropTable('Transactions');
  }
};
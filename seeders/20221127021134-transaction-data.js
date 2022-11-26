'use strict';
const transactionsData = require('../masterdata/transaction.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataTransactionsToBeSeeded = transactionsData.map((eachTransactionData) => {
      return {
        user_id: eachTransactionData.user_id,
        type_transaction: eachTransactionData.type_transaction,
        categoryTransaction_id: eachTransactionData.categoryTransaction_id,
        dompet_id: eachTransactionData.dompet_id,
        amount_transaction: eachTransactionData.amount_transaction,
        name_transaction: eachTransactionData.name_transaction,
        date_transaction: eachTransactionData.date_transaction,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Transactions', dataTransactionsToBeSeeded, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, { truncate: true, restartIdentity: true });
  }
};

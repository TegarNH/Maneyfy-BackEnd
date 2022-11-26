'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Transaction.belongsTo(models.Dompet, {
        foreignKey: 'dompet_id'
      });
      Transaction.belongsTo(models.CategoryEarning, {
        foreignKey: 'categoryTransaction_id'
      });
      Transaction.belongsTo(models.CategorySpending, {
        foreignKey: 'categoryTransaction_id'
      });
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    type_transaction: DataTypes.STRING,
    categoryTransaction_id: DataTypes.INTEGER,
    dompet_id: DataTypes.INTEGER,
    amount_transaction: DataTypes.INTEGER,
    name_transaction: DataTypes.STRING,
    date_transaction: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
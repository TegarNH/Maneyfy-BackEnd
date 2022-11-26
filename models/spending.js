'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spending.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Spending.belongsTo(models.Dompet, {
        foreignKey: 'dompet_id'
      });
      Spending.belongsTo(models.CategorySpending, {
        foreignKey: 'categorySpending_id'
      });
    }
  }
  Spending.init({
    user_id: DataTypes.INTEGER,
    categorySpending_id: DataTypes.INTEGER,
    dompet_id: DataTypes.INTEGER,
    spending: DataTypes.INTEGER,
    name_spending: DataTypes.STRING,
    date_spending: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Spending',
  });
  return Spending;
};
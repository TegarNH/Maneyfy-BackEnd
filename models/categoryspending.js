'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategorySpending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategorySpending.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      CategorySpending.hasMany(models.Earning, {
        foreignKey: 'categoryEarning_id'
      });
      CategorySpending.belongsTo(models.IconSpending, {
        foreignKey: 'icSpending_id'
      });
    }
  }
  CategorySpending.init({
    user_id: DataTypes.INTEGER,
    icSpending_id: DataTypes.INTEGER,
    categoryName_spending: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategorySpending',
  });
  return CategorySpending;
};
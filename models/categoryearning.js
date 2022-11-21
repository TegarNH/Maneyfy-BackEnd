'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryEarning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryEarning.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      CategoryEarning.belongsTo(models.IconEarning, {
        foreignKey: 'icEarning_id'
      });
      CategoryEarning.hasMany(models.Earning, {
        foreignKey: 'categoryEarning_id'
      });
    }
  }
  CategoryEarning.init({
    user_id: DataTypes.INTEGER,
    icEarning_id: DataTypes.INTEGER,
    categoryName_earning: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryEarning',
  });
  return CategoryEarning;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IconSpending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IconSpending.hasMany(models.CategorySpending, {
        foreignKey: 'icSpending_id'
      });
    }
  }
  IconSpending.init({
    url_icSpending: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IconSpending',
  });
  return IconSpending;
};
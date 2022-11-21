'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IconEarning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IconEarning.hasMany(models.CategoryEarning, {
        foreignKey: 'icEarning_id'
      });
    }
  }
  IconEarning.init({
    url_icEarning: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IconEarning',
  });
  return IconEarning;
};
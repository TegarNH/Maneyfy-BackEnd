'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IconDompet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IconDompet.hasMany(models.Dompet, {
        foreignKey: 'icDompet_id'
      });
    }
  }
  IconDompet.init({
    url_icDompet: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IconDompet',
  });
  return IconDompet;
};
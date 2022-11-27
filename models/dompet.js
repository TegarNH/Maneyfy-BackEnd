'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dompet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dompet.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Dompet.belongsTo(models.IconDompet, {
        foreignKey: 'icDompet_id'
      });
      Dompet.hasMany(models.Transaction, {
        foreignKey: 'dompet_id'
      });
    }
  }
  Dompet.init({
    user_id: DataTypes.INTEGER,
    icDompet_id: DataTypes.INTEGER,
    name_dompet: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dompet',
  });
  return Dompet;
};
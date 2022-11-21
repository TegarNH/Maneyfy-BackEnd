'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Earning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Earning.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Earning.belongsTo(models.Dompet, {
        foreignKey: 'dompet_id'
      });
    }
  }
  Earning.init({
    user_id: DataTypes.INTEGER,
    kategoriEarning_id: DataTypes.INTEGER,
    dompet_id: DataTypes.INTEGER,
    earning: DataTypes.INTEGER,
    name_earning: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Earning',
  });
  return Earning;
};
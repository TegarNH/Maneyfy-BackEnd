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
      Earning.belongsTo(models.CategoryEarning, {
        foreignKey: 'categoryEarning_id'
      });
      Earning.belongsTo(models.CategorySpending, {
        foreignKey: 'categoryEarning_id'
      });
    }
  }
  Earning.init({
    user_id: DataTypes.INTEGER,
    type_transaction: DataTypes.STRING,
    categoryEarning_id: DataTypes.INTEGER,
    dompet_id: DataTypes.INTEGER,
    earning: DataTypes.INTEGER,
    name_earning: DataTypes.STRING,
    date_earning: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Earning',
  });
  return Earning;
};
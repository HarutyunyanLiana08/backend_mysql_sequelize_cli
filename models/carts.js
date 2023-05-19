'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  //   static associate(models) {
  //     // define association here
  //     Carts.belongsTo(models.User);
  //     Carts.hasMany(models.Orders)
  //   }
  // }
  static associate(models) {
    Carts.belongsTo(models.Users, { foreignKey: 'UsersId' });
    Carts.hasMany(models.Orders, { foreignKey: 'CartsId' });
  }
}
  
  Carts.init({
    userId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};
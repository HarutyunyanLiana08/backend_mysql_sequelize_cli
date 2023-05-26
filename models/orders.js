'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  //   static associate(models) {
  //     // define association here
  //     Orders.belongsTo(models.Carts);
  //     Orders.belongsTo(models.Products)
  //   }
  // }
  static associate(models) {
    Orders.belongsTo(models.Users, { foreignKey: 'UsersId' });
    Orders.belongsTo(models.Products, { foreignKey: 'ProductsId' });
  }
  }  
  Orders.init({
    usersId: DataTypes.INTEGER,
    productsId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
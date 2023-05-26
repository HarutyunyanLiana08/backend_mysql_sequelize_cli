const Sequelize = require('sequelize');
const DataTypes = require('sequelize');
const config = require('../config/config.json').development
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});
const Users = require('../models/users')(sequelize, DataTypes);
const Products = require('../models/products')(sequelize, DataTypes);
const Orders = require('../models/orders')(sequelize, DataTypes);
const Categories = require('../models/categories')(sequelize, DataTypes);
module.exports = {Users, Products, Categories, Orders}
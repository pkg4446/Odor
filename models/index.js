const Sequelize     = require('sequelize');
const env           = process.env.NODE_ENV || 'development';
const config        = require('../config/config.js')[env];
const db            = {};

const sequelize     = new Sequelize(config.database, config.username, config.password, config);

const sensor          = require('./stink_gps');



db.sequelize        = sequelize;


db.sensor             = sensor;

sensor.init(sequelize);

sensor.associate(db);

module.exports = db;

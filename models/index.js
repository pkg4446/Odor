const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.js')[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize    = sequelize;



const md_list   = require('./device/md_list');
const plasma    = require('./device/plasma');

db.md_list      = md_list;
db.plasma       = plasma;

md_list.init(sequelize);
plasma.init(sequelize);

md_list.associate(db);
plasma.associate(db);



const contribute    = require('./smell/contribute');
const mapping       = require('./smell/mapping');
const sensor        = require('./smell/sensor');

db.contribute       = contribute;
db.mapping          = mapping;
db.sensor           = sensor;

contribute.init(sequelize);
mapping.init(sequelize);
sensor.init(sequelize);

contribute.associate(db);
mapping.associate(db);
sensor.associate(db);



const farm_info = require('./user/farm_info');
const farm_mdl  = require('./user/farm_mdl');
const user      = require('./user/user');
const wallet    = require('./user/wallet');

db.farm_info    = farm_info;
db.farm_mdl     = farm_mdl;
db.user         = user;
db.wallet       = wallet;

farm_info.init(sequelize);
farm_mdl.init(sequelize);
user.init(sequelize);
wallet.init(sequelize);

farm_info.associate(db);
farm_mdl.associate(db);
user.associate(db);
wallet.associate(db);

module.exports = db;

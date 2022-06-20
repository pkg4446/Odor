const Sequelize = require('sequelize');

module.exports = class Farm_MDL extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            FARM_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            MDL_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            //위도
            GPS_LATITUDE: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            //경도
            GPS_LONGITUDE: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            REMARK: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'FARM_MDL_CONN',
            tableName  : 'farm_mdl',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
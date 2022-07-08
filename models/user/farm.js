const Sequelize = require('sequelize');

module.exports = class Farm extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            FARM_ID: {
                type: Sequelize.STRING(16),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            USER_ID: {
                type: Sequelize.STRING(16),
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
            timestamps : false,
            underscored: false,
            modelName  : 'FARM',
            tableName  : 'farm',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
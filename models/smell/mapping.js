const Sequelize = require('sequelize');

module.exports = class Mapping extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            FARM_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                unique: true,
            },

            AMN: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            HYD_SLF: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            MTHN: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            VOCS: {
                type: Sequelize.SMALLINT.UNSIGNED,
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

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'MAPPING',
            tableName  : 'mapping',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci', 
        });
    }
    static associate(db) {
    }
}
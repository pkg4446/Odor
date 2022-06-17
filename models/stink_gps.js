const Sequelize = require('sequelize');

module.exports = class StinkGPS extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            FRMH_ID: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },

            AMN: {
                type: Sequelize.UNSIGNED.SMALLINT,
                allowNull: false,
            },

            HYD_SLF: {
                type: Sequelize.UNSIGNED.SMALLINT,
                allowNull: false,
            },

            MTHN: {
                type: Sequelize.UNSIGNED.SMALLINT,
                allowNull: false,
            },

            VOCS: {
                type: Sequelize.UNSIGNED.SMALLINT,
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
            timestamps : true,
            underscored: false,
            modelName  : 'StinkGPS',
            tableName  : 'stink_gps',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci', 
        });
    }
    static associate(db) {
    }
}
const Sequelize = require('sequelize');

module.exports = class mapping extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            //투고:0, 센서:1
            TYPE: {
                type: Sequelize.BOOLEAN,
                primaryKey: true,
                autoIncrement: true
            },
            //위도
            GPS_LATITUDE: {
                type: Sequelize.DECIMAL(10,6),
                allowNull: false,
            },
            //경도
            GPS_LONGITUDE: {
                type: Sequelize.DECIMAL(10,6),
                allowNull: false,
            },

            WEIGHT: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },

            STRONG: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
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
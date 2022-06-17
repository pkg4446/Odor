const Sequelize = require('sequelize');

module.exports = class Contribute extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                unique: true,
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

            TMST: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }, 

        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'Contribute',
            tableName  : 'contribute',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci', 
        });
    }
    static associate(db) {
    }
}
const Sequelize = require('sequelize');

module.exports = class Plasma extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            PLSM_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            //관련 센서모듈 아이디
            MD_ID: {
                type: Sequelize.STRING(32),
                allowNull: true,
            },
            //On, Off
            STATUS: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },

            INTERVAR: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: true,
            },

            ONTIME: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: true,
            },

            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: true,
            },

            TMST: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },            

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'PLASMA',
            tableName  : 'Plasma',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
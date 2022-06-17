const Sequelize = require('sequelize');

module.exports = class Odor extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            NO: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            //장비번호
            MD_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },
            //측정시간
            MESURE_DT: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            //측정값들

            TMPR: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            HMDT: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            CD: {  ////Carbon Dioxide
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            AMN: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            HYD_SLF: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },

            OZN: {
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


        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Odor',
            tableName  : 'odor',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
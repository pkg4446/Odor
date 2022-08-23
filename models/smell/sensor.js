const Sequelize = require('sequelize');

module.exports = class sensor extends Sequelize.Model{
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
            //온도
            TMPR: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //습도
            HMDT: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //일산화탄소
            CD: {  ////Carbon Dioxide
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //암모니아
            AMN: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //황화수소
            HYD_SLF: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //이산화탄소
            CO2: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //메탄
            MTHN: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },
            //
            VOCS: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull: false,
            },


        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Sensor',
            tableName  : 'sensor',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
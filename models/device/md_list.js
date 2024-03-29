const Sequelize = require('sequelize');

module.exports = class MD_List extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            MD_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            MD_TYPE: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },

            FARM_ID: {
                type: Sequelize.STRING(16),
                allowNull: false,
                defaultValue: "null",
            },

            IP:{
                type: Sequelize.STRING(32),
                allowNull: true,
            },

            INS_TMST: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'MD_LIST',
            tableName  : 'md_list',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
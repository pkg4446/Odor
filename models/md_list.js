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
                type: Sequelize.STRING(8),
                allowNull: true,
            },

            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            INS_TMST: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },            

        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'MD_LIST',
            tableName  : 'md_list',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
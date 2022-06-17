const Sequelize = require('sequelize');

module.exports = class Info_FARM extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            FARM_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            REMARK: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'FARM_INFO',
            tableName  : 'farm_info',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
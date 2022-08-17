const Sequelize = require('sequelize');

module.exports = class Wallet extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            USER_ID: {
                type: Sequelize.STRING(16),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            Private_key: {
                type: Sequelize.STRING(64),
                allowNull: false,
            },

            Public_key: {
                type: Sequelize.STRING(130),
                allowNull: false,
            },

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Wallet',
            tableName  : 'wallet',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
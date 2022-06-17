const Sequelize = require('sequelize');

module.exports = class Wallet extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            Wallet_key: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'Wallet',
            tableName  : 'wallet',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
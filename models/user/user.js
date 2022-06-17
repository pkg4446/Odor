const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            USER_ID: {
                type: Sequelize.STRING(32),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },

            USER_NAME: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },

            USER_PASS: {
                type: Sequelize.STRING(64),
                allowNull: false,
            },

            USER_EMAIL: {
                type: Sequelize.STRING(32),
                allowNull: false,
            },

            USER_PHONE: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },

            USER_ADRESS: {
                type: Sequelize.STRING(64),
                allowNull: false,
            },

            TOKEN:          {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            CREATEDAT: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            UPDATEDAT: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            DELETEDAT: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

        },{
            sequelize,
            timestamps : true,
            underscored: false,
            modelName  : 'User',
            tableName  : 'user',
            paranoid   : true,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
const Sequelize = require('sequelize');

module.exports = class Plasma extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            MD_ID: {
                type: Sequelize.STRING(32),
                allowNull:  false,
                primaryKey: true,
                unique:     true,
            },
            //On, Off
            STATUS: {
                type: Sequelize.BOOLEAN,
                allowNull:      false,
                defaultValue:   false,
            },            
            WIFI: {
                type: Sequelize.BOOLEAN,
                allowNull:      false,
                defaultValue:   true,
            },
            METHOD: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   2,
            },
            
            //set
            A_S_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            A_S_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            A_E_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            A_E_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            
            P_S_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            P_S_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            P_E_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            P_E_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },

            T_ON: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            T_OFF: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            P_D: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            P_T: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },

            S_CO2: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            S_NH3: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            S_H2S: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            H_T: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },

            TMST: {
                type: Sequelize.DATE,
                allowNull:      false,
                defaultValue:   Sequelize.NOW
            },            

        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'PLASMA',
            tableName  : 'plasma',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
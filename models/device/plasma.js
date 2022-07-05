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
            tableName  : 'Plasma',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {
    }
}
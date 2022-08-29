const Sequelize = require('sequelize');

module.exports = class Plasma extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            //장비 아이디(맥 주소)
            MD_ID: {
                type: Sequelize.STRING(32),
                allowNull:  false,
                primaryKey: true,
                unique:     true,
            },
            //On, Off (작동)
            STATUS_R: {
                type: Sequelize.BOOLEAN,
                allowNull:      false,
                defaultValue:   false,
            },
            //팬
            STATUS_F: {
                type: Sequelize.BOOLEAN,
                allowNull:      false,
                defaultValue:   false,
            },
            //히터      
            STATUS_H: {
                type: Sequelize.BOOLEAN,
                allowNull:      false,
                defaultValue:   false,
            },   
            
            //set
            //오전 시작 시
            A_S_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오전 시작 분
            A_S_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오전 종료 시
            A_E_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오전 종료 분
            A_E_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오후 시작 시
            P_S_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오후 시작 분
            P_S_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오후 종료 시
            P_E_H: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //오후 종료 분
            P_E_M: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //켜져있는 시간(분)
            T_ON: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //꺼져있는 시간(분) //T_ON, T_OFF 주기로 작동시간동안 반복. ex)T_ON=8, T_OFF=2 //8분 작동 2분 휴식 반복.
            T_OFF: {
                type: Sequelize.SMALLINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //펌프 딜레이
            P_D: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //펌프 작동시간
            P_T: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //센서 CO2가 S_CO2값 이상이면 플라즈마 작동
            S_CO2: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //센서 NH3가 S_NH3 이상이면 플라즈마 작동
            S_NH3: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //센서 H2S가 S_H2S 이상이면 플라즈마 작동
            S_H2S: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //온도센서가 H_T 이하이면 플라즈마 작동
            H_T: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull:      false,
                defaultValue:   false,
            },
            //타임스템프(갱신 시간으로 wifi에 연결되어 있는지 확인.);
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
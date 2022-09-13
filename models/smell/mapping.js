const Sequelize = require('sequelize');

module.exports = class mapping extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            IDX: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            //투고:0, 센서:1
            TYPE: {
                type: Sequelize.BOOLEAN,
                primaryKey: true,
                autoIncrement: true
            },
            //가우시안 퍼퓸 결과값을 넣기 위해서 센서의 경우 센서 인덱스를 받아와야함(원뿔 형태로 퍼짐 표현하기위해 지름이 다양한 원을 여럿 표시.)
            //위도
            GPS_LATITUDE: {
                type: Sequelize.DECIMAL(10,6),
                allowNull: false,
            },
            //경도
            GPS_LONGITUDE: {
                type: Sequelize.DECIMAL(10,6),
                allowNull: false,
            },

            WEIGHT: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            //퍼지는 거리 (표준편차는 생략)
            STRONG: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'MAPPING',
            tableName  : 'mapping',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci', 
        });
    }
    static associate(db) {
    }
}
const farm        = require('../../models/user/farm');
const moduleList  = require('../../models/device/md_list');

const Sequelize   = require('../module');

module.exports = {

  create : async function(data){
    try {
      const object = await farm.create({
        FARM_ID:        data.FARM_ID,
        USER_ID:        data.USER_ID,
        GPS_LATITUDE:   data.GPS_LATITUDE,
        GPS_LONGITUDE:  data.GPS_LONGITUDE,
        REMARK:         data.REMARK
      });
      return object;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  update : async function(data){
    try {
      const object = await farm.update({
        FARM_ID:        data.FARM_ID,
        GPS_LATITUDE:   data.GPS_LATITUDE,
        GPS_LONGITUDE:  data.GPS_LONGITUDE,
        REMARK:         data.REMARK
      },{
        where: {USER_ID: data.USER_ID}
      });
      return object;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  list : async function(data){
    try {
      const object = await farm.findAll({
        where:{USER_ID:data.USER_ID},
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  delete : async function(data){
    const t = await Sequelize.transaction();
    let response = false;
    /*
    data = 
    */
    try {

      await moduleList.update({FARM_ID: "null"},
      {where: {FARM_ID:data.FARM_ID, USER_ID:data.USER_ID}});
      await farm.destroy({where: {FARM_ID:data.FARM_ID, USER_ID:data.USER_ID}});

      await t.commit();
      response = true;
    } 
    catch (error) {
      console.log('트랜젝션 에러, 롤백', error);
      await t.rollback();
    }    
    return response;
  },//Transaction
}
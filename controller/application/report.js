const mapping      = require('../../models/smell/mapping');
const contribute  = require('../../models/smell/contribute');

const { Op }      = require("sequelize");

module.exports = {
  center_create : async function(data){
    try {
      const object = await mapping.create({
        GPS_LATITUDE:   data.GPS_LATITUDE,
        GPS_LONGITUDE:  data.GPS_LONGITUDE,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  center_update : async function(data){
    try {
      const object = await mapping.update({
        GPS_LATITUDE:   data.GPS_LATITUDE,
        GPS_LONGITUDE:  data.GPS_LONGITUDE,
        WEIGHT:         data.WEIGHT,
        STRONG:         data.STRONG,
        TMST:           new Date(),
      },{
        where: {IDX: data.IDX}
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  center_read : async function(data){
    const radius = 50; //Meter
    const X_disitance = Math.abs(radius/1000/111/Math.cos(data.GPS_LATITUDE));
    const Y_disitance = Math.abs(radius/1000/111);

    try { 
      const object = await mapping.findAll({
          where: {
              GPS_LATITUDE:  {[Op.between]: [data.GPS_LATITUDE - X_disitance, data.GPS_LATITUDE + X_disitance]},
              GPS_LONGITUDE: {[Op.between]: [data.GPS_LONGITUDE - Y_disitance, data.GPS_LONGITUDE + Y_disitance]}
          },
          raw : true ,
      });
      let Center = {
        IDX:            0,
        DISTANCE:       0,
        GPS_LATITUDE:   0,
        GPS_LONGITUDE:  0,
        WEIGHT:         0,
      }
  
      if(!object){
        for(let point of object){
          const D_X = Math.cos(point.GPS_LATITUDE) * 111 * Math.abs(point.GPS_LONGITUDE - data.GPS_LONGITUDE) * 1000;
          const D_Y = Math.abs(point.GPS_LATITUDE - data.GPS_LATITUDE) * 111 * 1000;
          const disitance = Math.sqrt(D_X*D_X + D_Y*D_Y);
          if(disitance < radius && disitance < Center.DISTANCE){
            Center.IDX      = point.IDX;
            Center.DISTANCE = disitance;
            Center.GPS_LATITUDE   = point.GPS_LATITUDE;
            Center.GPS_LONGITUDE  = point.GPS_LONGITUDE;
            Center.WEIGHT         = point.WEIGHT;
          }
        }
      }

      return Center;
    } catch (err) {
    console.error(err);
    next(err);
    }
  },//List

  
  contribute_read : async function(data){
    const radius = 50; //Meter
    const X_disitance = Math.abs(radius/1000/111/Math.cos(data.GPS_LATITUDE));
    const Y_disitance = Math.abs(radius/1000/111);
    const now         = new Date();
    let   validData   = new Date();
    const validDay    = 1;
    validData.setDate(now.getDate()-validDay);

    try { 
      const object = await contribute.findAll({
          where: {
              GPS_LATITUDE:   {[Op.between]:  [data.GPS_LATITUDE - X_disitance, data.GPS_LATITUDE + X_disitance]},
              GPS_LONGITUDE:  {[Op.between]:  [data.GPS_LONGITUDE - Y_disitance, data.GPS_LONGITUDE + Y_disitance]},            
              TMST:           {[Op.gte]:      validData}
          },
          raw : true ,
      });      
      return object;
      
    } catch (err) {
    console.error(err);
    next(err);
    }
  },//List
}
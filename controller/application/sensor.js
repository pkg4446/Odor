const mapping     = require('../../models/smell/mapping');

const { Op }      = require("sequelize");

module.exports = {
  mapping_create : async function(data){
    try {
      const object = await mapping.create({
        FARM_ID:   data.FARM_ID,
        AMN:   data.AMN,
        HYD_SLF:   data.HYD_SLF,
        MTHN:   data.MTHN,
        VOCS:   data.VOCS,
        GPS_LATITUDE:   data.GPS_LATITUDE,
        GPS_LONGITUDE:   data.GPS_LONGITUDE,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  mapping_update : async function(data){
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
}
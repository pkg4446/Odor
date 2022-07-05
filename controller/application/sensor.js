const sensor      = require('../../models/smell/sensor');
const moduleList  = require('../../models/device/md_list');

const { Op }      = require("sequelize");

module.exports = {
  create : async function(data){
    try {
      const object = await sensor.create({
        MD_ID:    data.MD_ID,
        TMPR:     data.TMPR,
        HMDT:     data.HMDT,
        CD:       data.CD,
        AMN:      data.AMN,
        HYD_SLF:  data.HYD_SLF,
        OZN:      data.OZN,
        MTHN:     data.MTHN,
        VOCS:     data.VOCS,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  junction : async function(data){
    try {
      const object = await sensor.create({
        MD_ID:    data.MD_ID,
        MD_TYPE:  data.MD_TYPE,
        USER_ID:  data.USER_ID,
        INS_TMST: data.INS_TMST,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },
}
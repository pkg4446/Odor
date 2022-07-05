const sensor      = require('../../models/smell/sensor');

module.exports = {
  log : async function(data){
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

  read : async function(DEVICE){
    try {
      const object = await sensor.findAll({
        where:{ MD_ID: DEVICE },
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },
}
const sensor      = require('../../models/smell/sensor');

module.exports = {
  log : async function(DATA){

    DATA.TMPR *= 1;
    DATA.HMDT *= 1;
    DATA.CD *= 1;
    DATA.AMN *= 1;
    DATA.HYD_SLF *= 1;
    DATA.OZN *= 1;
    DATA.MTHN *= 1;
    DATA.VOCS *= 1;
    
    try {            
      const object = await sensor.create({
        MD_ID:    DATA.MD_ID,
        TMPR:     DATA.TMPR,
        HMDT:     DATA.HMDT,
        CD:       DATA.CD,
        AMN:      DATA.AMN,
        HYD_SLF:  DATA.HYD_SLF,
        CO2:      DATA.CO2,
        MTHN:     DATA.MTHN,
        VOCS:     DATA.VOCS,
      });
      return object;
    } catch (error) {
      console.error(err);
    }

  },

  readOne : async function(DEVICE){
    try {
      const object = await sensor.findOne({
        where:{ MD_ID: DEVICE },
        raw:  true,
        order :[['MESURE_DT', 'DESC']],
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
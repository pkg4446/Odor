const Library   = require('../controller/application/report');

module.exports  = {
  report : async function(data){    
    try {         
      const radius  = 50;   
      data.Diameter = radius;
      let response  = Library.contribute_create(data);
      const object  = await Library.center_read(data);
      let Center = {
        IDX:            0,
        GPS_LATITUDE:   0,
        GPS_LONGITUDE:  0,
        WEIGHT:         1,
        STRONG:         0,
        DISTANCE:       0,        
      }      
      
      if(object[0]){
        Center = object[0];
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
        if(Center.IDX){          
          let Area = {
            DISTANCE:       0,
            GPS_LATITUDE:   0,
            GPS_LONGITUDE:  0,
            WEIGHT:         0,
          }
          Center.GPS_LATITUDE   = (data.GPS_LATITUDE + (Center.WEIGHT*Center.GPS_LATITUDE))/(Center.WEIGHT+1);
          Center.GPS_LONGITUDE  = (data.GPS_LONGITUDE + (Center.WEIGHT*Center.GPS_LONGITUDE))/(Center.WEIGHT+1);
          Center.Diameter       = radius;
          const contribute      = await Library.contribute_read(Center);
          if(contribute){
            for(let point of contribute){
              point.GPS_LATITUDE  *=1;
              point.GPS_LONGITUDE *=1;
              const D_X = Math.cos(point.GPS_LATITUDE) * 111 * Math.abs(point.GPS_LONGITUDE - data.GPS_LONGITUDE) * 1000;
              const D_Y = Math.abs(point.GPS_LATITUDE - data.GPS_LATITUDE) * 111 * 1000;    
              Area.GPS_LATITUDE   += point.GPS_LATITUDE;
              Area.GPS_LONGITUDE  += point.GPS_LONGITUDE;
              Area.WEIGHT++;    
              const disitance = Math.sqrt(D_X*D_X + D_Y*D_Y);
              if(disitance > Area.DISTANCE){
                Area.DISTANCE = disitance;
              }
            }
            Center.STRONG         = Area.DISTANCE;
            Center.GPS_LATITUDE   = Area.GPS_LATITUDE /Area.WEIGHT;
            Center.GPS_LONGITUDE  = Area.GPS_LONGITUDE/Area.WEIGHT;
            Center.WEIGHT         = Area.WEIGHT;
          }else{
            Center.STRONG         = 0; 
          }        
          Center.TMST           = new Date();      
          await Library.center_update(Center);
        }
      }else{     
        Center.GPS_LATITUDE   = data.GPS_LATITUDE;
        Center.GPS_LONGITUDE  = data.GPS_LONGITUDE;
        await Library.center_create(Center);
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  },//report

  read : async function(data){
    try {
      const response = await Library.center_read(data);
      return response;
    } catch (error) {
      console.error(err);
    }
  },
}
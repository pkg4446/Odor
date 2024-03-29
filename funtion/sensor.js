require('dotenv').config();
const { DATE } = require('sequelize');
const Library   = require('../controller/application/report');

module.exports  = {
  report : async function(data){    
    try {         
      return;
    } catch (err) {
      console.error(err);
    }
  },//report
}

function format(value){
  let response = value;
  if(value<10) response = `0${value}`
  return response;
}

async function weather(GPS_LATITUDE,GPS_LONGITUDE){
  //GPS_LATITUDE  = 55;
  GPS_LONGITUDE = 127;
  const axios = require('axios');
  const today = new Date();
  const now   = `${today.getFullYear()}${format(today.getMonth()+1)}${format(today.getDate())}`; 
  let time    = today.toTimeString().split(' ');  
  time        = time[0].split(':');
  time        = `${format(time[0]-1)}${format(time[1])}`
  const data  = {
                serviceKey: process.env.gokey,
                numOfRows:  10,
                pageNo:     1,
                base_date:  now,
                base_time:  time,
                nx:         GPS_LATITUDE,
                ny:         GPS_LONGITUDE,
                dataType:   "JSON"
  }

  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${data.serviceKey}&base_date=${data.base_date}&base_time=${data.base_time}&nx=${data.nx}&ny=${data.ny}&dataType=JSON`

  const weatherData = {
    GPS_LATITUDE:   GPS_LATITUDE,
    GPS_LONGITUDE:  GPS_LONGITUDE,
    PTY:  null, //강수 형태
    REH:  null, //습도 %
    RN1:  null, //시간당 강수량 mm
    T1H:  null, //섭씨 기온
    UUU:  null, //동서바랑성분
    VEC:  null, //풍향
    VVV:  null, //남북바람성분
    WSD:  null  //풍속 m/s
  }

  await axios({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: "get", // 요청 방식
    url: URL // 요청 주소
  })
  .then(function(res){
    const response = res.data.response.body.items.item;    
    for(let item of response){
      switch (item.category) {
        case "PTY":
          weatherData.PTY=item.obsrValue;
          break;
        case "REH":
          weatherData.REH=item.obsrValue;      
          break;
        case "RN1":
          weatherData.RN1=item.obsrValue; 
          break;
        case "T1H":
          weatherData.T1H=item.obsrValue; 
          break;
        case "UUU":
          weatherData.UUU=item.obsrValue; 
          break;
        case "VEC":
          weatherData.VEC=item.obsrValue; 
          break;
        case "VVV":
          weatherData.VVV=item.obsrValue; 
          break;
        case "WSD":
          weatherData.WSD=item.obsrValue; 
          break;                                                
        default:
          break;
      }
    }          
  });
  console.log(weatherData);  
  return weatherData;
}

function area(data){
  const condition = {
    small:      data.Small,
    day:        data.Day,//sun(condition.day), strong, moderate, slight //cloud(night) >1/2>
    wind:       data.Wind,//<2,3,5,6<
    distance:   data.Distance,
    distanceY:  data.distanceY
  }
let grade;

if(condition.wind>6){
  if(condition.day==1){
    grade=2;
  }else{
    grade=3;
  }
}else if(condition.wind>=5){
  if(condition.day==1||condition.day==2){
    grade=2;
  }else{
    grade=3;
  }
}else if(condition.wind>=3){
  if(condition.day==1||condition.day==2){
    grade=1;
  }else if(condition.day==3||condition.day==4){
    grade=3;
  }else{
    grade=4;
  }
}else if(condition.wind>=2){
  if(condition.day==1||condition.day==2){
    grade=1;
  }else if(condition.day==3){
    grade=2;
  }else{      
    grade=4;
  }
}else {    
  grade=1;
}

let deviationY, deviationZ;
switch (grade) {
  case 1:
    deviationY=deviation(0.32,condition.distance);
    deviationZ=0.24*condition.distance*Math.sqrt(1+(0.001*condition.distance));
    break;
  case 2:
    deviationY=deviation(0.22,condition.distance);
    deviationZ=0.20*condition.distance;
    break;
  case 3:
    deviationY=deviation(0.16,condition.distance);
    deviationZ=0.14*condition.distance*((1+(0.003*condition.distance))**(-1/2));
    break;
  case 4:
    deviationY=deviation(0.11,condition.distance);
    deviationZ=0.08*condition.distance*((1+(0.0015*condition.distance))**(-1/2));
    break;
  default:
    break;
}

let small = (condition.small/(Math.PI*deviationY*deviationZ*condition.wind))*Math.exp(-(Math.pow(-(condition.distanceY/deviationZ),2)/2));


console.log(condition.small,deviationY,deviationZ,condition.wind);


return small;
}


function deviation(value,distance){
return value*distance*((1+(0.0004*distance))**(-1/2));
}
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

function area(data){
  const condition = {
    day:  1,//sun(day), strong, moderate, slight //cloud(night) >1/2>
    wind: 2,//<2,3,5,6<
  }
  let grade;

  if(wind>6){
    if(day==1){
      grade=2;
    }else{
      grade=3;
    }
  }else if(wind>=5){
    if(day==1||day==2){
      grade=2;
    }else{
      grade=3;
    }
  }else if(wind>=3){
    if(day==1||day==2){
      grade=1;
    }else if(day==3||day==4){
      grade=3;
    }else{
      grade=4;
    }
  }else if(wind>=2){
    if(day==1||day==2){
      grade=1;
    }else if(day==3){
      grade=2;
    }else{      
      grade=4;
    }
  }else {    
    grade=1;
  }

  let valueY, valueZ;
  switch (grade) {
    case 1:
      
      break;
    case 2:
      
      break;
    case 3:
      
      break;
    case 4:
      
      break;
    default:
      break;
  }
  let deviationY, deviationZ;

}
const moduleList  = require('../../models/device/md_list');
const plasma      = require("../../models/device/plasma");

module.exports = {
  plasma_read : async function(DEVICE){
    try {
      const object = await plasma.findByPk(DEVICE,{raw: true}); 
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  plasma_create : async function(DEVICE){
    try {
      const object = await plasma.create({
        MD_ID:  DEVICE
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  plasma_junction : async function(DEVICE){
    try {
      const object = await moduleList.create({
        MD_ID:    DEVICE,
        MD_TYPE:  true,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },
  
  sensor_junction : async function(data){
    try {
      const object = await moduleList.create({
        MD_ID:    data.MD_ID,
        MD_TYPE:  false,
        IP:       data.IP
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  junction_update : async function(data){
    try {
      const object = await moduleList.update({
        USER_ID:  data.USER_ID,
      },{
        where: {MD_ID: data.MD_ID, MD_TYPE:data.MD_TYPE}
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  list : async function(data){
    try {
      const object = await moduleList.findAll({
        where:{ USERID: data.USERID, MD_TYPE: data.MD_TYPE },
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  sensor_search : async function(IPv4){
    try {
      const object = await moduleList.findAll({
        where:{ IP: IPv4 },
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },

  junction_IP : async function(data){
    try {
      const object = await moduleList.update({
        USER_ID:  data.USER_ID,
      },{
        where: {IP: data.IP, USER_ID: "null"}
      });
      return object;
    } catch (error) {
      console.error(err);
    }
  },
 
}
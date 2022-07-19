const moduleList  = require('../../models/device/md_list');
const plasma      = require("../../models/device/plasma");

const Sequelize   = require('../module');
const { Op }    = require("sequelize");

module.exports = {
  plasma_read : async function(DEVICE){
    try {
      const object = await plasma.findByPk(DEVICE,{raw: true}); 
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  plasma_create : async function(DEVICE){
    try {
      const object = await plasma.create({
        MD_ID:  DEVICE
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  plasma_update : async function(DEVICE,COLUMN,VALUE){
    try {      
      console.log("plasma_update:",DEVICE,COLUMN,VALUE);
      const object = await Sequelize.query(`UPDATE plasma SET ${COLUMN}=${VALUE},TMST=now(),WIFI=true WHERE MD_ID='${DEVICE}'`);
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  plasma_WIFI : async function(){
    const now   = new Date();
    console.log(now);
    now.setDate(now.getDate()-1);
    console.log(now);
    try {      
      const object = await plasma.update({
        WIFI:false
      },{
        where: {TMST:{[Op.gt]: now}}
      });
      return object;
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    }
  },

  junction_update : async function(data){
    try {
      const object = await moduleList.update({
        FARM_ID:  data.FARM_ID,
      },{
        where: {MD_ID: data.MD_ID, MD_TYPE:data.MD_TYPE}
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  list : async function(data){
    try {
      const object = await moduleList.findAll({
        where:{ FARM_ID: data.FARM_ID, MD_TYPE: data.MD_TYPE },
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  sensor_read : async function(DEVICE){
    try {
      const object = await moduleList.findAll({
        where:{ MD_ID: DEVICE, MD_TYPE: false},
        raw:  true,
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  IP_update : async function(data){
    try {
      const object = await moduleList.update({
        IP:  data.IP,
      },{
        where: {MD_ID: data.MD_ID, MD_TYPE: false}
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },

  junction_IP : async function(data){
    try {
      const object = await moduleList.update({
        FARM_ID:  data.FARM_ID,
      },{
        where: {IP: data.IP, FARM_ID: "null"}
      });
      return object;
    } catch (error) {
      console.error(error);
    }
  },
 
}